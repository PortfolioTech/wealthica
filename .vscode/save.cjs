const fs = require('fs');
const semver = require('semver');

// Read package.json
const pkgPath = './package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

// Add current date to versiondt
const date = new Date();
pkg.saved = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

// Write changes back to package.json
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

// Write version and versiondt to version.json
fs.writeFileSync('./version.json', JSON.stringify({ version: pkg.version, commited: pkg.commited, saved: pkg.saved }, null, 2));