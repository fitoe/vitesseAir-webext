const { exec } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')

const { name, version } = require('../package.json')

const distDir = path.resolve(__dirname, '../extension/dist')
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}
const outputFile = path.join(distDir, `${name}-${version}.crx`)
exec(`crx pack extension -o "${outputFile}"`, (error, stdout, stderr) => {
  if (error) {
    console.error(`pack crx error: ${error}`)
    return
  }
  console.log(`pack crx success: ${outputFile}`)
})
