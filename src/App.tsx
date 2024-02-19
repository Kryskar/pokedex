import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'

const App = () => {

  const ROUTES = {
    home:"/",
  }
 

  return (
    <>
      <Routes>
        <Route path={ROUTES.home} element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App
