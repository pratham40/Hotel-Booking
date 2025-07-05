import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home';
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';
import RoomDetail from './pages/RoomDetail';
import MyBooking from './pages/MyBooking';

function App() {

  const isOwnerPath = useLocation().pathname.includes('owner');

  return (
      <div>
        {!isOwnerPath && <NavBar/>}
        <div className='w-full h-full'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/rooms' element={<AllRooms/>}/>
            <Route path='/rooms/:id' element={<RoomDetail />}/>
            <Route path='/my-bookings' element= {<MyBooking/>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
  )
}

export default App
