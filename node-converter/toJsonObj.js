const fs = require('fs')
const path = require('path')

const directoryPath = path.join(__dirname, 'data')

fs.readdir(directoryPath, function (err, files) {
  if (err) {
    console.error('Error reading directory', err)
    return
  }

  files.forEach(function (file) {
    const filePath = path.join(directoryPath, file)

    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        console.error('Error reading file', filePath, err)
        return
      }

      const newData = { data: JSON.parse(data) }

      fs.writeFile(filePath, JSON.stringify(newData), function (err) {
        if (err) {
          console.error('Error writing file', filePath, err)
          return
        }

        console.log('File updated successfully', filePath)
      })
    })
  })
})
