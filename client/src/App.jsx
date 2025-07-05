import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {

  const isOwnerPath = useLocation().pathname.includes('owner');

  return (
      <div>
        {!isOwnerPath && <NavBar/>}
        <div className='w-full h-full'>
          <Routes>
            <Route path='/' element={<Home/>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
  )
}

export default App
