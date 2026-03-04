#!/bin/bash

set -e

if [[ $(id -u) -eq 0 ]]; then
    echo "ERROR: Container must run as non-root user (current uid=$(id -u)), use user: directive in docker-compose" >&2
    exit 1
fi

exec 3>&1 4>&2 &> >(tee -a /config/supervisord.log)

source '/usr/local/bin/system/scripts/docker/utils.sh'

cat << "EOF"
Remotion Render Node
    _____            ___  
    |___ /   _ __    ( _ ) 
     |_ \  | '_ \   / _ \ 
    ___) | | | | | | (_) |
   |____/  |_| |_|  \___/ 
   https://github.com/3n8


EOF

source '/etc/image-build-info'

if [[ -z "${TZ}" ]]; then
    export TZ="UTC"
fi

if [[ -f "/usr/share/zoneinfo/${TZ}" ]]; then
    ln -sf "/usr/share/zoneinfo/${TZ}" /etc/localtime 2>/dev/null || true
fi

echo "[info] Timezone set to '${TZ}'" | ts '%Y-%m-%d %H:%M:%.S'

if [[ "${HOST_OS,,}" == "unraid" ]]; then
    echo "[info] Host is running unRAID" | ts '%Y-%m-%d %H:%M:%.S'
fi

echo "[info] System information: $(uname -a)" | ts '%Y-%m-%d %H:%M:%.S'
echo "[info] Image architecture: '${TARGETARCH}'" | ts '%Y-%m-%d %H:%M:%.S'
echo "[info] Base image: '${BASE_RELEASE_TAG}'" | ts '%Y-%m-%d %H:%M:%.S'
echo "[info] Application: '${APPNAME}'" | ts '%Y-%m-%d %H:%M:%.S'

export PUID=$(id -u)
export PGID=$(id -g)

echo "[info] Running as UID='${PUID}', GID='${PGID}'" | ts '%Y-%m-%d %H:%M:%.S'

if [[ ! -f "/config/perms.txt" ]]; then
    if [[ -d "/config" ]]; then
        echo "[info] Setting ownership and permissions recursively on '/config'..." | ts '%Y-%m-%d %H:%M:%.S'
        set +e
        chown -R "${PUID}":"${PGID}" "/config" 2>/dev/null
        exit_code_chown=$?
        chmod -R 775 "/config" 2>/dev/null
        exit_code_chmod=$?
        set -e

        if (( exit_code_chown != 0 || exit_code_chmod != 0 )); then
            echo "[warn] Unable to chown/chmod '/config', assuming SMB/NFS mountpoint" | ts '%Y-%m-%d %H:%M:%.S'
        else
            echo "[info] Successfully set ownership and permissions on '/config'" | ts '%Y-%m-%d %H:%M:%.S'
        fi
    else
        echo "[info] '/config' directory does not exist, skipping" | ts '%Y-%m-%d %H:%M:%.S'
    fi

    if [[ -d "/data" ]]; then
        echo "[info] Setting ownership and permissions non-recursively on '/data'..." | ts '%Y-%m-%d %H:%M:%.S'
        set +e
        chown "${PUID}":"${PGID}" "/data" 2>/dev/null
        exit_code_chown=$?
        chmod 775 "/data" 2>/dev/null
        exit_code_chmod=$?
        set -e

        if (( exit_code_chown != 0 || exit_code_chmod != 0 )); then
            echo "[info] Unable to chown/chmod '/data', assuming SMB/NFS mountpoint" | ts '%Y-%m-%d %H:%M:%.S'
        else
            echo "[info] Successfully set ownership and permissions on '/data'" | ts '%Y-%m-%d %H:%M:%.S'
        fi
    else
        echo "[info] '/data' directory does not exist, skipping" | ts '%Y-%m-%d %H:%M:%.S'
    fi

    echo "This file prevents ownership and permissions from being applied/re-applied to '/config' and '/data'" > /config/perms.txt 2>/dev/null || true
else
    echo "[info] Permissions file '/config/perms.txt' exists, skipping" | ts '%Y-%m-%d %H:%M:%.S'
fi

disk_usage_tmp=$(du -s /tmp 2>/dev/null | awk '{print $1}' || echo "0")
if [ "${disk_usage_tmp}" -gt 1073741824 ]; then
    echo "[warn] /tmp directory contains 1GB+ of data, skipping clear down" | ts '%Y-%m-%d %H:%M:%.S'
    ls -al /tmp 2>/dev/null || true
else
    echo "[info] Deleting files in /tmp (non recursive)..." | ts '%Y-%m-%d %H:%M:%.S'
    rm -f /tmp/* > /dev/null 2>&1 || true
fi

echo "[info] GPU support:" | ts '%Y-%m-%d %H:%M:%.S'
if [[ -d "/dev/dri" ]]; then
    echo "[info] DRI devices found:" | ts '%Y-%m-%d %H:%M:%.S'
    ls -la /dev/dri/ 2>/dev/null | ts '%Y-%m-%d %H:%M:%.S' || true
else
    echo "[info] No DRI devices found (GPU passthrough not enabled)" | ts '%Y-%m-%d %H:%M:%.S'
fi

echo "[info] Checking VAAPI..." | ts '%Y-%m-%d %H:%M:%.S'
vainfo 2>/dev/null | ts '%Y-%m-%d %H:%M:%.S' || echo "[info] vainfo not available" | ts '%Y-%m-%d %H:%M:%.S'

echo "[info] Setting up /app Remotion project..." | ts '%Y-%m-%d %H:%M:%.S'
if [[ -d "/app" ]] && [[ -f "/app/package.json" ]] && [[ -d "/app/src" ]]; then
    echo "[info] Valid Remotion project found at /app" | ts '%Y-%m-%d %H:%M:%.S'
    if [[ ! -d "/app/node_modules" ]]; then
        echo "[info] Running npm install in /app..." | ts '%Y-%m-%d %H:%M:%.S'
        cd /app && npm cache clean --force 2>/dev/null || true
        npm install --cache /tmp/.npm 2>&1 | ts '%Y-%m-%d %H:%M:%.S' || echo "[warn] npm install failed" | ts '%Y-%m-%d %H:%M:%.S'
    else
        echo "[info] node_modules already exists, skipping npm install" | ts '%Y-%m-%d %H:%M:%.S'
    fi
    if [[ -d "/app/assets" ]]; then
        echo "[info] Setting up /app/public/assets for static assets..." | ts '%Y-%m-%d %H:%M:%.S'
        mkdir -p /app/public/assets
        cp -r /app/assets/* /app/public/assets/ 2>/dev/null || true
    fi
else
    echo "[info] No valid Remotion project at /app, creating from templates..." | ts '%Y-%m-%d %H:%M:%.S'
    if [[ -d "/templates" ]]; then
        mkdir -p /app
        cp -r /templates/* /app/ 2>/dev/null || true
        chown -R "${PUID}":"${PGID}" /app 2>/dev/null || true
        chmod -R 755 /app 2>/dev/null || true
        echo "[info] Running npm install in /app..." | ts '%Y-%m-%d %H:%M:%.S'
        cd /app && npm cache clean --force 2>/dev/null || true
        npm install --cache /tmp/.npm 2>&1 | ts '%Y-%m-%d %H:%M:%.S' || echo "[warn] npm install failed" | ts '%Y-%m-%d %H:%M:%.S'
        if [[ -d "/app/assets" ]]; then
            echo "[info] Setting up /app/public/assets for static assets..." | ts '%Y-%m-%d %H:%M:%.S'
            mkdir -p /app/public/assets
            cp -r /app/assets/* /app/public/assets/ 2>/dev/null || true
        fi
    else
        echo "[warn] Templates not found at /templates, cannot set up /app" | ts '%Y-%m-%d %H:%M:%.S'
    fi
fi

set +e
mkdir -p /config/run 2>/dev/null
chmod 775 /config/run 2>/dev/null
chmod -R 777 /config 2>/dev/null || true
chmod -R 777 /data 2>/dev/null || true
set -e

REMOTION_PORT="${REMOTION_PORT:-3003}"

if [[ ! -f "/config/remotion.conf" ]]; then
    echo "[info] No remotion.conf found, creating default configuration..." | ts '%Y-%m-%d %H:%M:%.S'
    set +e
    cat > /config/remotion.conf << EOFCONFIG
# Remotion API Server Configuration
# Default configuration - created on first run

# Server port
PORT=${REMOTION_PORT}

# Enable GPU acceleration (auto-detected if not specified)
# GPU_ACCELERATION=vaapi
EOFCONFIG
    config_result=$?
    set -e
    if (( config_result == 0 )); then
        echo "[info] Created default remotion.conf with port ${REMOTION_PORT}" | ts '%Y-%m-%d %H:%M:%.S'
    else
        echo "[warn] Could not create remotion.conf, skipping config creation" | ts '%Y-%m-%d %H:%M:%.S'
    fi
else
    echo "[info] Found existing remotion.conf, using current configuration" | ts '%Y-%m-%d %H:%M:%.S'
    
    if [[ -n "${REMOTION_PORT}" ]]; then
        echo "[info] Overriding PORT in remotion.conf with REMOTION_PORT=${REMOTION_PORT}" | ts '%Y-%m-%d %H:%M:%.S'
        sed -i "s/^PORT=.*/PORT=${REMOTION_PORT}/" /config/remotion.conf 2>/dev/null || true
    fi
fi

echo "[info] Starting Supervisor..." | ts '%Y-%m-%d %H:%M:%.S'

exec 1>&3 2>&4

exec /usr/bin/supervisord -c /etc/supervisord.conf -n
