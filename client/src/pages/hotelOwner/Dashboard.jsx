import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

function Dashboard() {

  const {axios, getToken, user, currency} = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0
  })


  async function fetchDashboardData() {
    try {
      const token = await getToken();
      const {data} = await axios.get("/api/bookings/hotel", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (data.success) {
        setDashboardData(data.dashboardData)
        toast.success("Dashboard data fetched successfully");
      } else {
        toast.error(data.message || "Failed to fetch dashboard data");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to fetch dashboard data. Please try again later.");
    }
  }

  useEffect(()=>{
    if (user) {
      fetchDashboardData();
    }
  }, [user])

  return (
    <div>
        <Title
          align="left"
          font="outfit"
          title="Dashboard"
          subtitle="Your dashboard - View your hotel stats, manage bookings, and update your listings."
        />
        <div className='flex gap-4 my-8'>
          <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8 '>
            <img src={assets.totalBookingIcon} alt="" className='max-sm:hidden h-10 ' />
            <div className='flex flex-col sm:ml-4 font-medium'>
              <p className='text-blue-500 text-lg'>
                Total Bookings
              </p>
              <p className='text-neutral-400 text-base'>
                {
                  dashboardData.totalBookings
                }
              </p>
            </div>
          </div>
          <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8 '>
            <img src={assets.totalRevenueIcon} alt="" className='max-sm:hidden h-10 ' />
            <div className='flex flex-col sm:ml-4 font-medium'>
              <p className='text-blue-500 text-lg'>
                Total Revenue
              </p>
              <p className='text-neutral-400 text-base'>
                {
                  dashboardData.totalRevenue
                }
              </p>
            </div>
          </div>
        </div>

        <h2 className='text-2xl font-semibold text-neutral-800 mb-4'>
            Recent Bookings
        </h2>

        <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll'>
          <table className='w-full '>
            <thead className='bg-gray-100'>
                <tr>
                  <th className='p-4 text-left text-gray-600 font-medium'>
                    User Name
                  </th>
                  <th className='p-4 text-left text-gray-600 font-medium'>
                    Room Name
                  </th>
                  <th className='p-4 text-left text-gray-600 font-medium'>
                    Total Amount
                  </th>
                  <th className='p-4 text-left text-gray-600 font-medium'>
                    Payment status
                  </th>
                </tr>
            </thead>
            <tbody className='text-sm'>
              {
                dashboardData.bookings.map((item,idx)=>(
                  <tr key={idx}>
                    <td className='p-4 border-b border-gray-200'>
                      {
                        item.user.username
                      }
                    </td>
                    <td className='p-4 border-b border-gray-200'>
                      {
                        item.room.roomType
                      }
                    </td>
                    <td className='p-4 border-b border-gray-200'>
                      {
                        item.totalPrice
                      }
                    </td>
                    <td className='p-4 border-b border-gray-200'>
                      <button className={`px-3 py-1 rounded text-sm font-medium 
                      ${item.isPaid ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {
                          item.isPaid ? 'Completed' : 'Pending'
                        }
                      </button>
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

export default Dashboard