const http = require('http');
const path = require('path');
const fs = require('fs');
const { bundle } = require('@remotion/bundler');
const { renderMedia } = require('@remotion/renderer');

const PORT = process.env.PORT || process.env.REMOTION_PORT || 3003;
const CONFIG_FILE = '/config/remotion.conf';
const PROJECT_DIR = process.env.PROJECT_DIR || '/app';

let config = {
  port: PORT,
  gpu: 'auto'
};

if (fs.existsSync(CONFIG_FILE)) {
  const configContent = fs.readFileSync(CONFIG_FILE, 'utf8');
  configContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      config[key.trim().toLowerCase()] = value.trim();
    }
  });
}

const PORT_NUM = parseInt(config.port) || 3003;

let bundledProject = null;

async function ensureProjectBundled() {
  if (bundledProject) {
    return bundledProject;
  }

  if (!fs.existsSync(PROJECT_DIR)) {
    throw new Error(`Project directory ${PROJECT_DIR} does not exist`);
  }

  if (!fs.existsSync(path.join(PROJECT_DIR, 'package.json'))) {
    throw new Error(`No package.json found in ${PROJECT_DIR}`);
  }

  console.log(`Bundling project from ${PROJECT_DIR}...`);
  
  try {
    bundledProject = await bundle({
      entryPoint: path.join(PROJECT_DIR, 'src/index.tsx'),
      outDir: path.join(PROJECT_DIR, 'dist'),
      webpackOverride: (config) => config,
    });
    console.log(`Project bundled at: ${bundledProject}`);
    return bundledProject;
  } catch (err) {
    console.error('Bundle error:', err.message);
    throw err;
  }
}

const server = http.createServer(async (req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      message: 'Remotion Render API Server',
      version: '1.0.0',
      projectDir: PROJECT_DIR,
      endpoints: [
        'GET / - This help',
        'GET /health - Health check',
        'POST /render - Render a video'
      ]
    }));
    return;
  }

  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'healthy', port: PORT_NUM, projectDir: PROJECT_DIR }));
    return;
  }

  if (req.url === '/render' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const options = JSON.parse(body);
        const compositionId = options.compositionId || 'Hello';
        const outputLocation = options.outputLocation || '/data/output.mp4';
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          status: 'rendering',
          compositionId,
          outputLocation,
          message: 'Render started'
        }));

        const serveUrl = await ensureProjectBundled();
        
        console.log(`Starting render: ${compositionId} -> ${outputLocation}`);
        
        const defaultComposition = {
          id: 'Hello',
          durationInFrames: 150,
          fps: 30,
          height: 1080,
          width: 1920,
          props: {},
        };
        
        await renderMedia({
          composition: options.composition || defaultComposition,
          serveUrl,
          outputLocation,
          codec: options.codec || 'h264',
          inputProps: options.inputProps || {},
          jpegQuality: options.quality || 80,
          verbose: true,
          chromiumExecutable: '/usr/bin/chromium',
        });

        console.log(`Render complete: ${outputLocation}`);
      } catch (e) {
        console.error('Render error:', e.message);
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT_NUM, '0.0.0.0', () => {
  console.log(`Remotion Render API Server running on port ${PORT_NUM}`);
  console.log(`Project directory: ${PROJECT_DIR}`);
  console.log(`GPU acceleration: ${config.gpu}`);
});
