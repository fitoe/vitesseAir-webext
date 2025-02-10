const { exec } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')

const { name, version } = require('../package.json')

const distDir = path.resolve(__dirname, '../dist')
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}
const outputFile = path.join(distDir, `${name}-v${version}.xpi`)
exec(`cross-env WEB_EXT_ARTIFACTS_DIR=./dist web-ext build --source-dir ./extension --filename ${name}-v${version}.xpi --overwrite-dest`, (error, stdout, stderr) => {
  if (error) {
    console.error(`pack xpi error: ${error}`)
    return
  }
  console.log(`pack xpi success: ${outputFile}`)
})
