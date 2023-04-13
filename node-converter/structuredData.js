const fs = require('fs')
const path = require('path')

const dataDir = './data'
const coordsDataDir = './coordsData'

// Create the coordsData directory if it doesn't exist
if (!fs.existsSync(coordsDataDir)) {
  fs.mkdirSync(coordsDataDir)
}

// Get a list of all data files in the data directory
const dataFiles = fs
  .readdirSync(dataDir)
  .filter((file) => file.startsWith('data') && file.endsWith('.json'))
  .sort((a, b) => parseInt(a.slice(4, -5)) - parseInt(b.slice(4, -5)))

// Process each data file
dataFiles.forEach((dataFile) => {
  const dataFilePath = path.join(dataDir, dataFile)
  const coordsDataFile = `coords${dataFile.slice(4)}`
  const coordsDataFilePath = path.join(coordsDataDir, coordsDataFile)

  // Read the data file
  const data = JSON.parse(fs.readFileSync(dataFilePath))

  // Process each data object
  const newData = {
    data: data.data
      .filter((obj) => {
        return Object.keys(obj).some(
          (key) =>
            ['One', 'Two', 'Three', 'Four', 'Five'].includes(key) &&
            obj[key] !== ''
        )
      })
      .map((obj) => {
        if (obj.One !== '') {
          return {
            x: typeof obj.Time === 'string' ? parseFloat(obj.Time) : obj.Time,
            y: typeof obj.One === 'string' ? parseFloat(obj.One) : obj.One,
          }
        }
      }),
  }

  // Write the coords data file
  fs.writeFileSync(coordsDataFilePath, JSON.stringify(newData, null, 2))
})
