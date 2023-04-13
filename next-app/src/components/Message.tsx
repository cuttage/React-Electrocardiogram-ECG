import { FC } from 'react'
import { Paper } from '@mui/material'

interface MessageProps {
  text: string
}

const Message: FC<MessageProps> = ({ text }) => {
  return (
    <div className="my-4">
      <Paper
        sx={{
          fontSize: '1.5rem',
          fontWeight: 600,
          backgroundColor: '#1976d2',
          color: '#fff',
          borderRadius: '0.5rem',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
          padding: '1.5rem',
        }}
        elevation={3}
        role="region"
      >
        {text}
      </Paper>
    </div>
  )
}

export default Message
