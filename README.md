# Remotion Render

A lightweight Arch Linux-based Docker image for server-side video rendering using Remotion and FFmpeg with GPU acceleration support.

## Important: Root Not Supported

**This container MUST run as a non-root user.** The container will refuse to start if running as UID 0 (root). Use the `user:` directive in docker-compose to specify a non-root user.

## Features

- **Arch Linux** - Rolling release base
- **Node.js** - Latest LTS
- **FFmpeg** - With VAAPI support for hardware acceleration
- **GPU Support** - VAAPI for AMD, Intel, and NVIDIA GPUs
- **Supervisor** - Process management with logging
- **Zero Mounts** - Works out of the box with built-in Remotion project
- **User/Group Mapping** - Run as any UID:GID via docker-compose user: directive

## What is this?

This container provides a Node.js + FFmpeg environment for rendering videos using Remotion. It runs as an API server - clients on your LAN send HTTP requests to trigger renders, and the rendered video is saved to the mounted `/data` directory.

## Zero Mounts Mode

This image works **without any mounts**! At container startup, it automatically:
1. Checks if `/app` contains a valid Remotion project
2. If not, creates one from built-in templates
3. Runs `npm install` to prepare dependencies
4. The API is ready to use immediately

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `TZ` | UTC | Timezone (e.g., Europe/London, America/New_York) |
| `REMOTION_PORT` | 3003 | Server port |

The `user:` directive in docker-compose handles UID/GID.

## Volumes

| Volume | Description |
|--------|-------------|
| `/config` | Persistent data (logs, configs) |
| `/data` | Output directory for rendered videos |

## GPU Support

This image supports hardware-accelerated encoding via VAAPI. The GPU drivers come from the **Docker host**, not the container.

### Host Requirements

**AMD GPUs:**
- `amdgpu` kernel module loaded
- `/dev/dri` device available
- Mesa drivers installed

**Intel GPUs:**
- `i915` kernel module loaded
- `/dev/dri` device available

**NVIDIA GPUs:**
- `nvidia-container-toolkit` installed
- `nvidia-smi` works on host

### Docker Compose with GPU

```yaml
services:
  remotion-render:
    image: ghcr.io/3n8/remotion-render:latest
    container_name: remotion-render
    restart: always
    user: "${PUID}:${PGID}"
    ports:
      - "3003:3003"
    devices:
      - /dev/dri:/dev/dri
    environment:
      - TZ=${TZ}
      - REMOTION_PORT=3003
    volumes:
      - ${DOCKER_HOME}/remotion-render:/config
```

## API Usage

### Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API help |
| `/health` | GET | Health check |
| `/render` | POST | Render a video |

### Render Request

```bash
curl -X POST http://localhost:3003/render \
  -H "Content-Type: application/json" \
  -d '{
    "compositionId": "Hello",
    "outputLocation": "/data/output.mp4",
    "codec": "h264",
    "quality": 80
  }'
```

**Options:**
- `compositionId` - Composition ID to render (default: "Hello")
- `outputLocation` - Output file path (default: "/data/output.mp4")
- `codec` - Video codec (default: "h264")
- `quality` - JPEG quality 0-100 (default: 80)

## Building

```bash
docker build -t ghcr.io/3n8/remotion-render:latest .
```

## Image Details

- **Base**: ghcr.io/3n8/arch-base-image
- **Node.js**: Latest LTS via pacman
- **FFmpeg**: Latest via pacman
- **Chromium**: Latest via pacman
