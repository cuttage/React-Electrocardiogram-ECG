const fs = require('fs')
const path = require('path')

function extractNamesAndExtensions(subfolderPath) {
  const files = fs.readdirSync(subfolderPath)
  const filenames = files.map((file) => file.split('.')[0]) // get the name of the file without the extension
  const extensions = files.map((file) => file.split('.')[1]) // get the extension of the file
  const namesAndExtensions = filenames.map(
    (name, i) => `${name}.${extensions[i]}`
  ) // combine the name and extension

  const maxListSize = 234 // set the maximum number of entries per list file
  const numLists = Math.ceil(namesAndExtensions.length / maxListSize) // calculate the number of list files needed

  const listDir = path.join(__dirname, 'list') // get the path of the list subfolder
  if (!fs.existsSync(listDir)) {
    // create the list subfolder if it doesn't exist
    fs.mkdirSync(listDir)
  }

  for (let i = 0; i < numLists; i++) {
    const startIdx = i * maxListSize // calculate the starting index of the current sublist
    const endIdx = Math.min(startIdx + maxListSize, namesAndExtensions.length) // calculate the ending index of the current sublist
    const sublist = namesAndExtensions.slice(startIdx, endIdx) // extract the current sublist

    const outputFile = path.join(listDir, `listNames${i + 1}.js`) // set the output file name for the current sublist

    const listNames = `export const fileNames = ${JSON.stringify(sublist)};\n`

    fs.writeFileSync(outputFile, listNames) // write the current sublist to the output file
  }
}

const subfolderPath = './coordsData'

extractNamesAndExtensions(subfolderPath)
