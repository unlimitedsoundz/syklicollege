// Simple production server for Hostinger
// This file is referenced as the "Application Startup File" in hPanel
const { execSync, spawn } = require('child_process');
const path = require('path');

const port = process.env.PORT || 3000;

console.log(`> Starting Next.js on port ${port}...`);

// Use next start which works with both standalone and regular builds
const child = spawn('npx', ['next', 'start', '-p', port.toString()], {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, NODE_ENV: 'production' }
});

child.on('error', (err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});

child.on('exit', (code) => {
    process.exit(code || 0);
});
