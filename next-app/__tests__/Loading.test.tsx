import { render, screen } from '@testing-library/react'
import Loading from '../src/components/Loading'
import '@testing-library/jest-dom'

describe('Loading component', () => {
  it('renders the given text', () => {
    const text = 'Loading...'
    render(<Loading text={text} />)
    const textElement = screen.getByText(text)
    expect(textElement).toBeInTheDocument()
  })

  it('renders the circular progress', () => {
    render(<Loading text="Loading..." />)
    const circularProgressElement = screen.getByRole('progressbar')
    expect(circularProgressElement).toBeInTheDocument()
  })
})
