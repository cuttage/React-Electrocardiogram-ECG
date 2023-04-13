import { readFile } from 'fs/promises'
import path from 'path'

export default async function handler(req, res) {
  const { page = 1, perPage = 1000, name } = req.query

  const start = (page - 1) * perPage
  const end = start + perPage

  if (!name) {
    res.status(400).json({ message: 'File name is required' })
    return
  }

  const filePath = path.join(process.cwd(), 'src', 'coordsData', name)

  try {
    const fileData = await readFile(filePath, { encoding: 'utf8' })
    const jsonData = JSON.parse(fileData)

    const pagedData = jsonData.data.slice(start, end)

    if (pagedData.length > 0) {
      res.status(200).json(pagedData)
    } else {
      res.status(404).json({ message: 'No data found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
