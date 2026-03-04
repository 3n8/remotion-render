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
let cachedCompositions = null;

function parseCompositionsFromIndex() {
  const indexPath = path.join(PROJECT_DIR, 'src/index.tsx');
  if (!fs.existsSync(indexPath)) {
    return [];
  }
  
  const content = fs.readFileSync(indexPath, 'utf8');
  const compositions = [];
  
  const compRegex = /<Composition\s+id=["']([^"']+)["']/g;
  let match;
  
  while ((match = compRegex.exec(content)) !== null) {
    const id = match[1];
    
    const idStart = match.index;
    const remaining = content.substring(idStart);
    
    const durationMatch = remaining.match(/durationInFrames=\{(\d+)\}/);
    const fpsMatch = remaining.match(/fps=\{(\d+)\}/);
    const widthMatch = remaining.match(/width=\{(\d+)\}/);
    const heightMatch = remaining.match(/height=\{(\d+)\}/);
    
    compositions.push({
      id,
      durationInFrames: durationMatch ? parseInt(durationMatch[1]) : 150,
      fps: fpsMatch ? parseInt(fpsMatch[1]) : 30,
      width: widthMatch ? parseInt(widthMatch[1]) : 1920,
      height: heightMatch ? parseInt(heightMatch[1]) : 1080,
      props: {}
    });
  }
  
  return compositions;
}

function cleanupTempFiles() {
  try {
    const tempDir = '/tmp';
    const entries = fs.readdirSync(tempDir);
    
    for (const entry of entries) {
      if (entry.startsWith('react-motion-render') || entry.startsWith('remotion-')) {
        const fullPath = path.join(tempDir, entry);
        try {
          fs.rmSync(fullPath, { recursive: true, force: true });
          console.log(`Cleaned up temp: ${fullPath}`);
        } catch (e) {
          console.log(`Could not clean ${fullPath}: ${e.message}`);
        }
      }
    }
  } catch (e) {
    console.log(`Temp cleanup error: ${e.message}`);
  }
}

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

async function ensureCompositionsLoaded() {
  if (cachedCompositions) {
    return cachedCompositions;
  }
  
  const serveUrl = await ensureProjectBundled();
  console.log('Parsing compositions from source...');
  
  try {
    cachedCompositions = parseCompositionsFromIndex();
    console.log(`Found ${cachedCompositions.length} compositions: ${cachedCompositions.map(c => c.id).join(', ')}`);
    return cachedCompositions;
  } catch (err) {
    console.error('Failed to parse compositions:', err.message);
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
        'GET /compositions - List available compositions',
        'POST /render - Render a video',
        'GET /download?file=filename.mp4&dir=config - Download a file'
      ]
    }));
    return;
  }

  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'healthy', port: PORT_NUM, projectDir: PROJECT_DIR }));
    return;
  }

  if (req.url === '/compositions' && req.method === 'GET') {
    try {
      const compositions = await ensureCompositionsLoaded();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        count: compositions.length,
        compositions: compositions.map(c => ({
          id: c.id,
          durationInFrames: c.durationInFrames,
          fps: c.fps,
          width: c.width,
          height: c.height
        }))
      }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  if (req.url.startsWith('/download') && req.method === 'GET') {
    const url = new URL(req.url, `http://localhost:${PORT_NUM}`);
    const file = url.searchParams.get('file');
    const dir = url.searchParams.get('dir') || 'config';
    
    if (!file) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing file parameter. Usage: /download?file=filename.mp4&dir=config' }));
      return;
    }
    
    const filePath = path.join('/', dir, file);
    
    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: `File not found: ${filePath}` }));
      return;
    }
    
    const stat = fs.statSync(filePath);
    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Length': stat.size,
      'Content-Disposition': `attachment; filename="${file}"`
    });
    
    fs.createReadStream(filePath).pipe(res);
    console.log(`Downloaded: ${filePath}`);
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
        
        const compositions = await ensureCompositionsLoaded();
        const composition = compositions.find(c => c.id === compositionId);
        
        if (!composition) {
          throw new Error(`Composition '${compositionId}' not found. Available: ${compositions.map(c => c.id).join(', ')}`);
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          status: 'rendering',
          compositionId,
          outputLocation,
          durationInFrames: composition.durationInFrames,
          fps: composition.fps,
          message: 'Render started'
        }));

        const serveUrl = await ensureProjectBundled();
        
        console.log(`Starting render: ${compositionId} (${composition.durationInFrames} frames) -> ${outputLocation}`);
        
        await renderMedia({
          composition,
          serveUrl,
          outputLocation,
          codec: options.codec || 'h264',
          inputProps: options.inputProps || {},
          jpegQuality: options.quality || 80,
          verbose: true,
          chromiumExecutable: '/usr/bin/chromium',
        });

        console.log(`Render complete: ${outputLocation}`);
        
        cleanupTempFiles();
        
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
