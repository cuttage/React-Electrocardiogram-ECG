import { Button, Typography } from '@mui/material'

const Custom500 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Typography variant="h1" className="text-9xl mb-8">
        500
      </Typography>
      <Typography variant="h4" className="mb-4">
        Sorry, there was a problem on the server.
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Go back home
      </Button>
    </div>
  )
}

export default Custom500
