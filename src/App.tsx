import './App.scss'

import CssBaseline from '@mui/material/CssBaseline'
import { ClientContext, GraphQLClient } from 'graphql-hooks'

import { createTheme } from '@mui/material/styles'
import { blueGrey } from '@mui/material/colors'

import Index from './pages/index/Index'
import { ThemeProvider } from '@mui/material'

const graphClient = new GraphQLClient({
  url: 'http://127.0.0.1:10000/api/v1',
})

const theme = createTheme({
  typography: {
    fontFamily: ['agave'].join(', '),
  },
  palette: {
    primary: {
      main: blueGrey[500],
    },
    secondary: {
      main: blueGrey[500],
    },
  },
})
function App() {
  return (
    <ClientContext.Provider value={graphClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Index />
      </ThemeProvider>
    </ClientContext.Provider>
  )
}

export default App
