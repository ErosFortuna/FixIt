const fs = require('node:fs');
const path = require('node:path');
function loadEnv() {
  try { for (const line of fs.readFileSync(path.join(__dirname, '.env'), 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][\w]*)\s*=\s*(.*)\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  } } catch {}
}
loadEnv();
const connectDatabase = require('./config/database');
const app = require('./app');
async function start() {
  const port = Number(process.env.PORT || 3000);
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fixit';
  try { await connectDatabase(uri); app.listen(port, () => console.log(`FixIt: http://localhost:${port} (MongoDB connected)`)); }
  catch (error) { console.error('Không kết nối được MongoDB:', error.message); process.exit(1); }
}
start();
