const { execSync } = require('node:child_process')
// scripts/release.js
const fs = require('node:fs')
const path = require('node:path')
// 清空 publicDir 目录
const currentDirname = __dirname
// const publicDir = path.resolve(currentDirname, '../extension/dist')
// const files = fs.readdirSync(publicDir)
// for (const file of files) {
//   const filePath = path.join(publicDir, file)
//   fs.unlinkSync(filePath)
// }
// console.log(`clear dir: ${publicDir}`)

try {
  execSync('npm run clear && cross-env NODE_ENV=production run-s clear build:web build:prepare build:background build:js', { stdio: 'inherit' })
  execSync('node scripts/pack-crx.js', { stdio: 'inherit' })
  execSync('node scripts/pack-zip.js', { stdio: 'inherit' })
}
catch (error) {
  console.error('Release process failed:', error)
  process.exit(1)
}
