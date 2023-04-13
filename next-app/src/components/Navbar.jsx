import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'

const Navbar = () => {
  return (
    <AppBar position="static" className="bg-gray-800">
      <Toolbar className="mx-auto">
        <Typography variant="h4" className="font-bold text-white">
          Electrocardiogram (ECG) Data Visualization - Idoven.ai Coding
          Challenge
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
