import { renderHook, act } from '@testing-library/react'
import { GlobalStateProvider } from '../src/components/GlobalStateProvider'
import useGlobalState from '../src/hooks/useGlobalState'

describe('useGlobalState', () => {
  it('sets chartAvailable to true when setChartAvailable is called with true', () => {
    const wrapper = ({ children }) => (
      <GlobalStateProvider>{children}</GlobalStateProvider>
    )
    const { result } = renderHook(() => useGlobalState(), { wrapper })

    expect(result.current.chartAvailable).toBe(false)

    act(() => {
      result.current.setChartAvailable(true)
    })

    expect(result.current.chartAvailable).toBe(true)
  })
})
