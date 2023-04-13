import { useContext } from 'react'
import { GlobalStateContext } from '../components/GlobalStateProvider'

const useGlobalState = () => {
  const { chartAvailable, setChartAvailable } = useContext(GlobalStateContext)

  return {
    chartAvailable,
    setChartAvailable,
  }
}

export default useGlobalState
