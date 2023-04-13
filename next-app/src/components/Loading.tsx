import { FC } from 'react'
import { CircularProgress, Typography } from '@mui/material'

interface LoadingProps {
  text: string
}

const Loading: FC<LoadingProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Typography variant="h4" className="mt-4">
        {text}
      </Typography>
      <CircularProgress size={80} />
    </div>
  )
}

export default Loading
