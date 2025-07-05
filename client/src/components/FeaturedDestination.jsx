import React from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'

function FeaturedDestination() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center px-6  bg-slate-50 py-20'>
      <Title title="Featured Destination" subtitle="Discover our top picks for your next stay" />
        <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
            {
                roomsDummyData.slice(0,4).map((room,index)=>(
                    <HotelCard key={room._id} room={room} index={index} />
                ))
            }
        </div>
        <div className='mt-10'>
            <button onClick={()=>{navigate("/rooms"); scrollTo(0,0)}} className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-300'>
                View All
            </button>
          </div>
    </div>
  )
}

export default FeaturedDestination