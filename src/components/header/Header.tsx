import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'

const Header = () => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Some title here
          </Typography>
          <Button color="inherit">Right Comp</Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}

export default Header
