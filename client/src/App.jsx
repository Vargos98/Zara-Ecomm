import React ,{useState} from 'react'
import styled ,{ThemeProvider} from 'styled-components'
import {lightTheme} from './utils/Themes'
import {BrowserRouter, Route, Routes} from'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Authentication from './pages/Authentication';
const Container = styled.div`
  width:100%;
  height:100vh;
  display:flex;
  flex-direction:column;
  background : ${({theme})=>theme.bg};
  color:${({theme})=> theme.text_primary};
  overflow-x:hidden;
  overflow-y:hidden;
  transition-a:all 0.2s ease;
`;
const App = () => {
  const [openAuth,setOpenAuth] = useState(false)
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container>
          <Navbar setOpenAuth={setOpenAuth}/>
          <Routes>
           <Route path='/' element={<Home />} />
          </Routes>
          {openAuth && <Authentication openAuth={openAuth} setOpenAuth={setOpenAuth}/>}
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App