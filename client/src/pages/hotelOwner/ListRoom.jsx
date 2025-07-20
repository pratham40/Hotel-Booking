import Title from "../../components/Title"
import React, { useState } from 'react'
import {roomsDummyData} from "../../assets/assets"
function ListRoom() {
  const [rooms, setRooms] = useState(roomsDummyData)
  console.log(rooms)
  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="List of Rooms"
        subtitle="Manage your hotel rooms"
      />
      <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll'>
        <table className='w-full '>
              <thead className='bg-gray-100'>
                <tr>
                  <th className='p-4 text-left text-gray-600 font-medium'>
                    Name
                  </th>
                  <th className='p-4 text-left text-gray-600 font-medium'>
                    Facility
                  </th>
                  <th className='p-4 text-left text-gray-600 font-medium'>
                    Price /Night
                  </th>
                  <th className='p-4 text-left text-gray-600 font-medium'>
                    Actions
                  </th>
                </tr>
            </thead>
            <tbody className="text-sm">
              {
                rooms.map((room,idx)=>(
                  <tr key={idx} className='border-b border-gray-200 hover:bg-gray-50'>
                    <td className="p-4 font-medium text-gray-800">
                      {room.roomType}
                    </td>
                    <td className="p-4 text-gray-600">
                      {
                        room.amenities.join(', ')
                      }
                    </td>
                    <td className="p-4 text-gray-600">
                      {
                        room.pricePerNight
                      }
                    </td>
                    <td className="p-4 text-gray-600">
                      <label  className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" 
                          className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                          checked={room.isAvailable}
                        />
                        <div className="ml-2 text-gray-700">
                          {room.isAvailable ? 'Available' : 'Unavailable'}
                        </div>
                      </label>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default ListRoom