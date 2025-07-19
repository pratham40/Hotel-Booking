import {assets, cities} from "../assets/assets"
import { IoIosCloseCircleOutline } from "react-icons/io";
function HotelReg() {
  return (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/50'>
            <form className="w-1/3 h-1/2 bg-white rounded-lg flex flex-col items-center justify-center gap-4 p-4">
                <img src={assets.regImage} className="w-1/2 rounded-xl hidden md:block" />
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 relative">
                    <IoIosCloseCircleOutline className="absolute top-2 right-2 cursor-pointer" />
                    <p>
                        <span className='text-2xl font-bold'>Register Your Hotel</span>
                        <span className='text-sm'>Please fill in the details below to register your hotel.</span>
                    </p>

                    <div className="w-full mt-4">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                            Hotel Name
                        </label>
                        <input id="name" type="text" placeholder='Hotel Name' className='w-full p-2 border border-gray-300 rounded-md' required />
                    </div>
                    <div className="w-full mt-4">
                        <label htmlFor="contact" className="block mb-2 text-sm font-medium text-gray-700">
                            Contact Number
                        </label>
                        <input id="contact" type="text" placeholder='Contact Number' className='w-full p-2 border border-gray-300 rounded-md' required />
                    </div>
                    <div className="w-full mt-4">
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <input id="address" type="text" placeholder='Address' className='w-full p-2 border border-gray-300 rounded-md' required />
                    </div>
                    <div className="w-full mt-4">
                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-700">
                            <select id="city" className="w-full p-2 border border-gray-300 rounded-md" required>
                                <option value="">Select City</option>
                                {
                                    cities.map((city, index) => (
                                        <option key={index} value={city}>{city}</option>
                                    ))
                                }
                            </select>
                        </label>
                    </div>

                    <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300">
                        Register Hotel
                    </button>
                </div>
            </form>
        </div>
  )
}

export default HotelReg