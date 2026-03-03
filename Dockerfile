FROM ghcr.io/3n8/arch-base-image:latest
LABEL maintainer="3n8"
LABEL org.opencontainers.image.source="https://github.com/3n8/remotion-render"

ARG APPNAME=remotion-render
ARG RELEASETAG=latest
ARG TARGETARCH=amd64

ENV HOME=/home/nobody \
    TERM=xterm \
    LANG=en_GB.UTF-8 \
    LC_ALL=en_GB.UTF-8 \
    REMOTION_PORT=3003 \
    NODE_PATH=/usr/lib/node_modules \
    PATH=/usr/local/bin/system/scripts/docker:/usr/local/bin/run:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

RUN pacman -Sy --noconfirm --needed \
        nodejs \
        npm \
        ffmpeg \
        chromium \
        && rm -rf /var/cache/pacman/pkg/*

RUN npm install -g @remotion/renderer@latest @remotion/bundler@latest @remotion/cli@latest

RUN mkdir -p /config /data /app /templates && \
    chmod -R 777 /config /data /app /templates

COPY build/common/root/supervisord.conf /etc/supervisord.conf
COPY build/common/root/install.sh /tmp/install.sh
COPY build/common/root/init.sh /usr/bin/init.sh
COPY build/common/root/utils.sh /usr/local/bin/system/scripts/docker/utils.sh
COPY build/common/root/server.js /config/server.js
COPY build/common/root/supervisor-remotion.conf /etc/supervisor/conf.d/remotion.conf
COPY build/common/root/templates /templates
RUN cp -r /templates/* /app/

RUN chmod +x /tmp/install.sh && /tmp/install.sh 2>/dev/null || true; rm -f /tmp/install.sh; \
    chmod +x /usr/bin/init.sh && \
    chmod +x /usr/local/bin/system/scripts/docker/utils.sh && \
    mkdir -p /run/supervisor

RUN echo "export BASE_RELEASE_TAG=${RELEASETAG}" > /etc/image-build-info && \
    echo "export TARGETARCH=${TARGETARCH}" >> /etc/image-build-info && \
    echo "export APPNAME=${APPNAME}" >> /etc/image-build-info

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["/usr/bin/init.sh"]
