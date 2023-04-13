import { render } from '@testing-library/react'
import {
  GlobalStateProvider,
  GlobalStateContext,
} from '../src/components/GlobalStateProvider'
import { useContext } from 'react'
import '@testing-library/jest-dom'

describe('GlobalStateProvider', () => {
  it('provides the setChartAvailable function', () => {
    let setChartAvailableValue = null
    const TestComponent = () => {
      const { setChartAvailable } = useContext(GlobalStateContext)
      setChartAvailableValue = setChartAvailable
      return <div>Test Component</div>
    }
    render(
      <GlobalStateProvider>
        <TestComponent />
      </GlobalStateProvider>
    )
    expect(typeof setChartAvailableValue).toBe('function')
  })
})
