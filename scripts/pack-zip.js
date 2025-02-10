const fs = require('node:fs')
const path = require('node:path')
const archiver = require('archiver')

const { name, version } = require('../package.json')

// 创建输出目录
const distDir = path.resolve(__dirname, '../extension/dist')
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}

const outputFileName = path.join(distDir, `${name}-${version}.zip`)
// 如果文件已存在则删除
if (fs.existsSync(outputFileName)) {
  fs.unlinkSync(outputFileName)
  console.log(`delete exist file: ${outputFileName}`)
}

// 使用 archiver 打包新文件
const output = fs.createWriteStream(outputFileName)
const archive = archiver('zip', {
  zlib: { level: 9 },
})

output.on('close', () => {
  console.log(`pack zip success: ${outputFileName}`)
})

archive.on('error', (err) => {
  throw err
})

archive.pipe(output)
archive.directory('extension/', 'zip-filename')

archive.finalize()
