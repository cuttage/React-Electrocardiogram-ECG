import { render, screen } from '@testing-library/react'
import Message from '../src/components/Message'
import '@testing-library/jest-dom'

describe('Message component', () => {
  it('renders the message text', () => {
    const text = 'Hello, world!'
    render(<Message text={text} />)
    const messageTextElement = screen.getByText(text)
    expect(messageTextElement).toBeInTheDocument()
  })

  it('has correct styling', () => {
    const text = 'Hello, world!'
    render(<Message text={text} />)
    const paperElement = screen.getByRole('region')
    expect(paperElement).toHaveStyle({
      fontSize: '1.5rem',
      fontWeight: 600,
      backgroundColor: '#1976d2',
      color: '#fff',
      borderRadius: '0.5rem',
      boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
      padding: '1.5rem',
    })
  })
})
