import './App.css'

import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material'

import { UploadFile, CreateNewFolder } from '@mui/icons-material'

function App() {
  return (
    <div className="App">
      <Box sx={{ height: '96vh', transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          sx={{ position: 'absolute', bottom: 16, right: 36 }}
          icon={<SpeedDialIcon />}
          ariaLabel={''}
        >
          <SpeedDialAction
            icon={<UploadFile />}
            tooltipTitle={'Upload file here.'}
          />
          <SpeedDialAction
            icon={<CreateNewFolder />}
            tooltipTitle={'Create new folder here'}
          />
        </SpeedDial>
      </Box>
    </div>
  )
}

export default App
