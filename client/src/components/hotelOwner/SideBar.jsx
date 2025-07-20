import { CiCircleList } from 'react-icons/ci'
import { IoIosAdd } from 'react-icons/io'
import { MdDashboardCustomize } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

function SideBar() {
  const SideBarLinks = [
    {
      name: 'Dashboard',
      path: '/owner',
      icon: <MdDashboardCustomize size={20} />
    },
    {
      name: 'Add Room',
      path: '/owner/add-room',
      icon: <IoIosAdd size={20} />
    },
    {
      name: 'List Rooms',
      path: '/owner/list-rooms',
      icon: <CiCircleList size={20} />
    }
  ]

  return (
    <div className="w-64 h-full bg-gray-200 p-4 shadow-md">
      {SideBarLinks.map((link, idx) => (
        <NavLink
          to={link.path}
          key={idx}
          end
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-md mb-2 transition-colors duration-200 ${
              isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-300'
            }`
          }
        >
          {link.icon}
          <p className="text-sm font-medium">{link.name}</p>
        </NavLink>
      ))}
    </div>
  )
}

export default SideBar
