import { useEffect } from 'react'
import Loading from './Loading'
import Message from './Message'
import useGlobalState from '../hooks/useGlobalState'

interface Message {
  x: number
  y: number
}

interface ChartProps {
  messages: Message[]
  loading: boolean
}

function Chart({ messages, loading }: ChartProps) {
  const { chartAvailable, setChartAvailable } = useGlobalState()

  const importChart = async () => {
    const { lightningChart, AxisScrollStrategies } = await import(
      '@arction/lcjs'
    )

    if (lightningChart) {
      setChartAvailable(true)

      const chart = lightningChart()
        .ChartXY({
          // theme: Themes.darkGold
        })
        .setTitle('ECG')

      const series = chart
        .addLineSeries({
          dataPattern: {
            pattern: 'ProgressiveX',
            regularProgressiveStep: true,
          },
        })
        .setDataCleaning({ minDataPointCount: 10000 })

      chart
        .getDefaultAxisY()
        .setTitle('mV')
        .setInterval({ start: -1600, end: 1000, stopAxisAfter: false })
        .setScrollStrategy(AxisScrollStrategies.expansion)

      chart
        .getDefaultAxisX()
        .setTitle('milliseconds')
        .setInterval({ start: 0, end: 2500, stopAxisAfter: false })
        .setScrollStrategy(AxisScrollStrategies.progressive)

      if (
        messages[0] &&
        typeof messages[0] === 'object' &&
        'x' in messages[0] &&
        'y' in messages[0] &&
        typeof messages[0].x === 'number' &&
        typeof messages[0].y === 'number'
      ) {
        // sort the messages array by ascending x value
        messages.sort((a, b) => a.x - b.x)
        messages.forEach((message) => {
          series.add({ x: message.x, y: message.y })
        })
      } else {
        console.log('Invalid data format for chart')
      }
    }
  }

  useEffect(() => {
    if (!loading) {
      importChart()
    }
  }, [loading])

  return (
    <div id="chart-container" className="h-400">
      {loading ? (
        <Loading text="Loading Tens of Millions of Data" />
      ) : chartAvailable ? (
        <div></div>
      ) : (
        <Message text="Chart is loading" />
      )}
    </div>
  )
}

export default Chart
