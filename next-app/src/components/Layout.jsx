import { useState, useEffect, memo } from 'react'
import Navbar from './Navbar'
import useGlobalState from '../hooks/useGlobalState'
import { fileNames as fileNames1 } from '../list/listNames1.js'
import { fileNames as fileNames2 } from '../list/listNames2.js'
import { fileNames as fileNames3 } from '../list/listNames3.js'
import { fileNames as fileNames4 } from '../list/listNames4.js'
import { fileNames as fileNames5 } from '../list/listNames5.js'
import { fileNames as fileNames6 } from '../list/listNames6.js'
import { fileNames as fileNames7 } from '../list/listNames7.js'
import { fileNames as fileNames8 } from '../list/listNames8.js'
import { fileNames as fileNames9 } from '../list/listNames9.js'
import { fileNames as fileNames10 } from '../list/listNames10.js'
import { fileNames as fileNames11 } from '../list/listNames11.js'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('./Chart.tsx'), { ssr: false })

const fetchDataForFiles = async (
  fileNamesList,
  page = 1,
  perPage = 2000,
  signal
) => {
  const allData = []

  for (const fileName of fileNamesList) {
    const response = await fetch(
      `/api/output?page=${page}&perPage=${perPage}&name=${fileName}`,
      { signal }
    )
    const data = await response.json()

    if (data.length === perPage) {
      const nextPageData = await fetchDataForFiles(
        [fileName],
        page + 1,
        perPage,
        signal
      )
      allData.push(...nextPageData)
    }

    allData.push(...data)
  }

  return allData
}

const Layout = ({ children }) => {
  const [messages, setMessages] = useState([])
  const [isLoading, setLoading] = useState(true)
  const { chartAvailable } = useGlobalState()

  useEffect(() => {
    const controller1 = new AbortController()
    const signal1 = controller1.signal
    const controller2 = new AbortController()
    const signal2 = controller2.signal

    const fetchDataForFiles = async (
      fileNamesList,
      page = 1,
      perPage = 2000,
      signal
    ) => {
      const allData = []

      for (const fileName of fileNamesList) {
        const response = await fetch(
          `/api/output?page=${page}&perPage=${perPage}&name=${fileName}`,
          { signal }
        )
        const data = await response.json()

        if (data.length === perPage) {
          const nextPageData = await fetchDataForFiles(
            [fileName],
            page + 1,
            perPage,
            signal
          )
          allData.push(...nextPageData)
        }

        allData.push(...data)
      }

      return allData
    }

    const fetchDataForFirstHalf = async () => {
      const fileNamesArrays = [
        fileNames1,
        fileNames2,
        fileNames3,
        fileNames4,
        fileNames5,
        fileNames6,
      ]

      const promises = fileNamesArrays.map(async (fileNames) => {
        const data = await fetchDataForFiles(fileNames, 1, 2000, signal1)
        setMessages((messages) => messages.concat(data))
      })

      await Promise.all(promises)
    }

    const fetchDataForSecondHalf = async () => {
      const fileNamesArrays = [
        fileNames7,
        fileNames8,
        fileNames9,
        fileNames10,
        fileNames11,
      ]

      const promises = fileNamesArrays.map(async (fileNames) => {
        const data = await fetchDataForFiles(fileNames, 1, 2000, signal2)
        setMessages((messages) => messages.concat(data))
      })

      await Promise.all(promises)
      setLoading(false)
    }

    fetchDataForFirstHalf()
      .then(() => new Promise((resolve) => setTimeout(resolve, 5000)))
      .then(fetchDataForSecondHalf)

    return () => {
      controller1.abort()
      controller2.abort()
    }
  }, [])

  return (
    <div className={`flex flex-col ${!chartAvailable && 'min-h-screen'}`}>
      <Navbar />
      <main
        className={`${
          chartAvailable
            ? 'h-0'
            : 'flex-1 flex justify-center items-center min-h-0'
        }`}
      >
        {children}
        <Chart messages={messages} loading={isLoading} />
      </main>
    </div>
  )
}

export default memo(Layout)
