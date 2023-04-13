const readline = require('readline')
const fs = require('fs')

// Create a new readline interface
const rl = readline.createInterface({
  input: fs.createReadStream('file.txt'),
})

let lineCount = 0
let fileSize = 0
const maxFileSize = 2 * 1024 * 1024 * 1024 // 2GB
const subtract = 50 * 1024 * 1024 // 50MB in bytes

// Open the file for writing
const fd = fs.openSync('data.json', 'w')

// When the file is finished being read, close the file
rl.on('close', () => {
  fs.closeSync(fd)
  console.log('JSON output saved to file!')
})

// Write an opening array bracket at the beginning of the file with no newline
fs.writeSync(fd, '[')

// Read the file line by line
rl.on('line', (line) => {
  // Split the line by comma
  const values = line.split(',')

  // If the first line, skip it
  if (lineCount === 0) {
    lineCount++
    return
  }

  // Otherwise, create an object with the parameter names as keys
  const obj = {
    Time: values[0],
    One: values[1],
    Two: values[2],
    Three: values[3],
    Four: values[4],
    Five: values[5],
  }

  const jsonOutput = JSON.stringify(obj)

  // Write a comma after the first line and before the newline character
  if (lineCount > 1) {
    fs.writeSync(fd, ',\n')
  }

  // Write the JSON output to the file as a separate line
  if (fs.writeSync && fd) {
    fs.writeSync(fd, jsonOutput)
    fileSize += Buffer.byteLength(jsonOutput, 'utf8')
  }

  // If the file size is greater than or equal to the maximum file size minus 50MB, write a closing array bracket and close the file
  if (fileSize >= maxFileSize - subtract) {
    console.log('Maximum file size reached.')
    fs.writeSync(fd, ']')
    fs.closeSync(fd)
    rl.close()
  }

  lineCount++
})
