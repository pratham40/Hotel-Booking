import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home';
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';
import RoomDetail from './pages/RoomDetail';
import MyBooking from './pages/MyBooking';
import HotelReg from './components/HotalReg';
import Layout from './pages/hotelOwner/Layout';
import NotFound from './components/NotFound';
import AddRoom from './pages/hotelOwner/AddRoom';
import Dashboard from './pages/hotelOwner/Dashboard';
import ListRoom from './pages/hotelOwner/ListRoom';
import { useAppContext } from './context/AppContext';
import Loader from './components/Loader';



function App() {

  const isOwnerPath = useLocation().pathname.includes('owner');

  const {showHotelReg} = useAppContext();

  return (
      <div>
        {!isOwnerPath && <NavBar/>}
        {showHotelReg && <HotelReg/>}
        <div className='w-full h-full'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/rooms' element={<AllRooms/>}/>
            <Route path='/rooms/:id' element={<RoomDetail />}/>
            <Route path='/my-bookings' element= {<MyBooking/>}/>
            <Route path='/loader/:nextUrl' element={<Loader />} />
            <Route path='/owner' element={<Layout/>}>
              <Route index element={<Dashboard/>} />
              <Route path='add-room' element={<AddRoom/>} />
              <Route path='list-rooms' element={<ListRoom/>} />
            </Route>
                    <Route path='*' element={<NotFound/>}/>

          </Routes>
        </div>
        {!isOwnerPath && <Footer/>}
      </div>
  )
}

export default App
