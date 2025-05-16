import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home';

function App() {

  const isOwnerPath = useLocation().pathname.includes('owner');

  return (
      <div>
        {!isOwnerPath && <NavBar/>}
        <div>
          <Routes>
            <Route path='/' element={<Home/>}/>
          </Routes>
        </div>
      </div>
  )
}

export default App
