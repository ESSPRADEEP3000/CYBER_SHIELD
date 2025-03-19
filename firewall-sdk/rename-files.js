const fs = require("fs");
const path = require("path");

const libDir = path.join(__dirname, "lib");
const indexJsPath = path.join(libDir, "index.js");
const indexMjsPath = path.join(libDir, "index.mjs");
const indexCjsPath = path.join(libDir, "index.cjs");

// Rename index.js to index.mjs
if (fs.existsSync(indexJsPath)) {
  fs.copyFileSync(indexJsPath, indexMjsPath);
  fs.copyFileSync(indexJsPath, indexCjsPath);
  console.log("✅ Renamed index.js to index.mjs and index.cjs");
} else {
  console.error("❌ index.js not found in lib directory");
}
