import { useState} from "react"


import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { Outlet } from "@mui/icons-material";


function App() {
  const[darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ?  'dark' : 'light';
  const theme = createTheme({
    palette:{
      mode:paletteType,
      background:{
        default : paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })
  function handleThemeChange(){
    setDarkMode(!darkMode)
  }
  
  return (
    <ThemeProvider theme={theme}> 
      <CssBaseline/>
      <Header darkmode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
      <Outlet />
      </Container>
      
    </ThemeProvider>
  )
}

export default App
