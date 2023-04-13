import { createContext, useState } from 'react'

export const GlobalStateContext = createContext()

export const GlobalStateProvider = ({ children }) => {
  const [chartAvailable, setChartAvailable] = useState(false)

  return (
    <GlobalStateContext.Provider
      value={{
        chartAvailable,
        setChartAvailable,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}
