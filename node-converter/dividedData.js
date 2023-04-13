const fs = require('fs')
const readline = require('readline')
const path = require('path')

const inputFilePath = 'data.json'
const outputDirPath = 'data'

if (!fs.existsSync(outputDirPath)) {
  fs.mkdirSync(outputDirPath)
}

const maxEntriesPerChunk = 10000

let buffer = ''
let entryCount = 0
let fileIndex = 1

const readStream = fs.createReadStream(inputFilePath, { encoding: 'utf-8' })
readStream.on('error', console.error)

readline
  .createInterface({
    input: readStream,
    crlfDelay: Infinity,
  })
  .on('line', (line) => {
    if (line.trim().length === 0) {
      return // skip empty lines
    }

    if (entryCount > 0) {
      buffer += '\n'
    }
    buffer += line.trim()
    entryCount++

    if (entryCount === maxEntriesPerChunk) {
      let outputFilePath = path.join(outputDirPath, `data${fileIndex}.json`)

      // Remove the comma at the end of buffer, if it exists
      if (buffer.endsWith(',')) {
        buffer = buffer.slice(0, -1)
      }

      // Add opening bracket to buffer, if we are not on the first file
      if (fileIndex !== 1) {
        buffer = '[' + buffer
      }

      // Add closing bracket to buffer and write to file
      buffer += ']'
      fs.writeFileSync(outputFilePath, buffer)

      buffer = ''
      entryCount = 0
      fileIndex++
    }
  })
  .on('close', () => {
    if (entryCount > 0) {
      let outputFilePath = path.join(outputDirPath, `data${fileIndex}.json`)

      if (buffer.endsWith(']')) {
        buffer = buffer.slice(0, -1)
      }

      // Remove the comma at the end of buffer, if it exists
      if (buffer.endsWith(',')) {
        buffer = buffer.slice(0, -1)
      }

      // Add opening and closing brackets to buffer if there are entries
      if (fileIndex !== 1) {
        buffer = '[' + buffer + ']'
      }

      fs.writeFileSync(outputFilePath, buffer)
    } else {
      fs.writeFileSync(path.join(outputDirPath, 'data.json'), '[]')
    }
  })
