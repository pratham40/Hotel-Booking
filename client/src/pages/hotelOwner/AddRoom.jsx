import React, { useState } from 'react';
import Title from '../../components/Title';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function AddRoom() {

  const {axios,getToken} = useAppContext();

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputData, setInputData] = useState({
    roomType: '',
    pricePerNight: 0,
    amenities: {
      'Free Wifi': false,
      'Free Breakfast': false,
      'Room Service': false,
      'Mountain View': false,
      'Pool Access': false,
    },
  });

  const handleImageChange = (key, file) => {
    console.log(`Image ${key} changed:`, file);
    if (!file) return;
    setImages(prev => ({ ...prev, [key]: file }));

    console.log(images)
  };

  const [loading, setLoading] = useState(false);

  async function handleSumbit(e) {
    e.preventDefault();

    if (!inputData.roomType || !inputData.pricePerNight || !Object.values(images).some((img)=> img)) {
      toast.error('Please fill all fields and upload at least one image.');
      return;
    }

    setLoading(true);

    try {
      const token = await getToken();
      const formData = new FormData();
      formData.append('roomType', inputData.roomType);
      formData.append('pricePerNight', inputData.pricePerNight);
      const amenities = Object.keys(inputData.amenities).filter(amenity => inputData.amenities[amenity]);
      console.log(amenities);

      formData.append('amenities', JSON.stringify(amenities));

      Object.keys(images).forEach((key)=>{
        images[key] && formData.append(`images`, images[key]);
      })

      const {data} = await axios.post('/api/rooms',formData,{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
      
      if (data.success) {
        toast.success('Room added successfully!');
        setInputData({
          roomType: '',
          pricePerNight: 0,
          amenities: {
            'Free Wifi': false,
            'Free Breakfast': false,
            'Room Service': false,
            'Mountain View': false,
            'Pool Access': false,
          },
        })
        setImages({
          1: null,
          2: null,
          3: null,
          4: null,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error adding room:', error);
      toast.error('Failed to add room. Please try again.');
      setLoading(false);
    }

  }

  if (loading) {
    return <AiOutlineLoading3Quarters
      className="animate-spin text-4xl text-blue-600 mx-auto my-20"
      style={{ display: 'block' }}
    />
  }

  return (
    <form
    onSubmit={handleSumbit}
    className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Title Section */}
      <Title
        align="left"
        font="outfit"
        title="Add Room"
        subtitle="Add a new room to your hotel"
      />

      {/* Images Section */}
      <p className="text-lg font-semibold text-neutral-800 mb-4">Images</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {Object.keys(images).map(key => (
          <label
            htmlFor={`roomImage${key}`}
            key={key}
            className="relative flex items-center justify-center aspect-square border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:border-gray-500 cursor-pointer overflow-hidden"
          >
            {images[key] ? (
              <img
                src={URL.createObjectURL(images[key])}
                alt={`Room ${key}`}
                className="absolute w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <MdOutlineCloudUpload className="text-4xl mb-1" />
                <span className="text-xs">Upload</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              id={`roomImage${key}`}
              hidden
              onChange={e => handleImageChange(key, e.target.files?.[0])}
            />
          </label>
        ))}
      </div>

        <div className='w-full flex max-sm:flex-col gap-4 mt-4'>
          <div className='flex-1 max-w-48'>
            <p className='text-gray-800 mt-4'>
              Room Type
            </p>
            <select
              value={inputData.roomType}
              onChange={(e) => setInputData({ ...inputData, roomType: e.target.value })}
            className='w-full p-2 border border-gray-300 rounded-lg'>
              <option value="">
                Select Room Type
              </option>
              <option value="Single Bed">Single Bed</option>
              <option value="Double Bed">Double Bed</option>
              <option value="Luxury Room">Luxury Room</option>
              <option value="Family Suite">Family Suite</option>
            </select>
          </div>
          <div>
            <p className='mt-4 text-gray-800'>
              Price <span className='text-xs'>
                /night
              </span>
            </p>
            <input type="number"
              placeholder='0' className='w-full p-2 border border-gray-300 rounded-lg'
              value={inputData.pricePerNight}
              onChange={(e) => setInputData({ ...inputData, pricePerNight: e.target.value })}
            />
          </div>
        </div>

        <p className='text-lg font-semibold text-neutral-800 mt-4 mb-2'>
          Amenities
        </p>
        <div>
          {
            Object.keys(inputData.amenities).map((amenity,index)=>(
              <div key={index} className='flex items-center gap-2 mb-2'>
                <input type="checkbox" id={`amenities${index+1}`} checked={inputData.amenities[amenity]} 
                  onChange={(e) => setInputData({
                    ...inputData,
                    amenities: {
                      ...inputData.amenities,
                      [amenity]: e.target.checked
                    }
                  })} />

                  <label htmlFor={`amenities${index+1}`} className='text-gray-800'>{amenity} </label>
              </div>
            ))
          }
        </div>
        <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200'>
          Add Room
        </button>
    </form>
  );
}

export default AddRoom;
