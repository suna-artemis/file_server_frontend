import { Paper } from '@mui/material'

const RootDirectoryContainer = () => {
  return (
    <Paper
      sx={(theme) => ({
        p: '24px',
        borderRadius: 4,
        display: { xs: 'none', md: 'block' },
        background: theme.palette.background.paper,
        overflowY: 'auto',
        height: {
          xs: 480,
          md: 720 + 24,
        },
      })}
    ></Paper>
  )
}

export default RootDirectoryContainer
