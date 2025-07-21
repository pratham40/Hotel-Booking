import { assets, cities } from "../assets/assets";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import toast from "react-hot-toast";

function HotelReg() {
  const { setShowHotelReg,axios,getToken,setIsOwner } = useAppContext();


  const[name, setName] = useState("");

  const[contact, setContact] = useState("");

  const[address, setAddress] = useState("");

  const[city, setCity] = useState("");


  async function handleSubmit(e) {
    e.preventDefault();
    const token = await getToken();
    console.log("Submitting hotel registration with token:", token);
    try {
      const { data } = await axios.post(`/api/hotels/`,{
        name,
        contact,
        address,
        city
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (data?.success) {
        toast.success("Hotel registered successfully!");
        setShowHotelReg(false);
        setIsOwner(true);
      }else{
        toast.error(data?.message || "Failed to register hotel. Please try again.");
        setShowHotelReg(false);
        setIsOwner(false); 
      }
    } catch (error) {
      console.error("Error registering hotel:", error);
      toast.error("Failed to register hotel. Please try again.");
    }
  }


  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[100] flex items-center justify-center bg-black/50">
      <div className="w-11/12 md:w-2/3 lg:w-1/2 bg-white rounded-lg p-6 flex flex-col md:flex-row relative">
        {/* Close Button */}
        <IoIosCloseCircleOutline
          className="absolute top-3 right-3 text-2xl cursor-pointer text-gray-700 hover:text-red-500 transition"
          onClick={() => setShowHotelReg(false)}
        />

        {/* Left Image Section */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-4">
          <img
            src={assets.regImage}
            alt="Register Hotel"
            className="w-full h-auto rounded-xl object-cover"
          />
        </div>

        {/* Right Form Section */}
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 flex flex-col gap-4 p-4">
          {/* Heading */}
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold">Register Your Hotel</p>
            <p className="text-sm text-gray-600">
              Please fill in the details below to register your hotel.
            </p>
          </div>

          {/* Hotel Name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Hotel Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Hotel Name"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Contact Number */}
          <div>
            <label
              htmlFor="contact"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              id="contact"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Contact Number"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              City
            </label>
            <select
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option 
              value="">Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300">
            Register Hotel
          </button>
        </form>
      </div>
    </div>
  );
}

export default HotelReg;
