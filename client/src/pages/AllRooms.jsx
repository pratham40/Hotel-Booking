import React from 'react';
import { facilityIcons, roomsDummyData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';

function CheckBox({label,selected=false,onChange}) {
    return (
        <label className=''>
            <input type="checkbox" checked={selected} onChange={(e)=>onChange(e.target.checked,label)} />
            <span className='font-light select-none'>
                {label}
            </span>
        </label>
    )
}

function AllRooms() {
    const navigate = useNavigate();
    const roomTypes = [
        'Single Room',
        'Double Room',
        'Deluxe Room',
        'Suite Room',
    ]

    const priceRanges = [
        'Under $100',
        '$100 - $200',
        '$200 - $300',
        '$300 - $400',
    ]

    const sortOptions = [
        "price low to high",
        "price high to low",
        "Newest",
    ]
    return (
        <div className="pt-28 md:pt-36 px-4 md:px-16 lg:px-24 xl:px-32 mb-16">

            <h1 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold mb-4">All Rooms</h1>
            <p className="text-gray-600 mb-10">Explore our wide range of rooms available for booking.</p>

            <div className="flex flex-col lg:flex-row gap-10">

                {/* Rooms Section */}
                <div className="flex flex-col gap-8">
                    {roomsDummyData.map((room) => (
                        <div
                            key={room._id}
                            className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-5 gap-6"
                        >
                            <img
                                onClick={() => {
                                    navigate(`/rooms/${room._id}`);
                                    scrollTo(0, 0);
                                }}
                                src={room.images[0]}
                                alt="room"
                                title="View Room Detail"
                                className="w-full md:w-64 h-48 object-cover rounded-lg cursor-pointer"
                            />

                            <div className="flex flex-col flex-1 gap-3 justify-between">
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">{room.hotel.city}</p>
                                    <p className="text-sm text-gray-500">{room.hotel.name}</p>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <CiLocationOn className="text-gray-500" size={20} />
                                    <span>{room.hotel.address}</span>
                                </div>

                                <div className="flex flex-wrap gap-4 mt-3">
                                    {room.amenities.map((item, index) => (
                                        <div key={index} className="flex flex-col items-center w-16">
                                            <img
                                                src={facilityIcons[item]}
                                                alt={item}
                                                className="w-6 h-6 mb-1"
                                            />
                                            <p className="text-xs text-gray-600 text-center">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col justify-between items-end min-w-max">
                                <p>
                                    <span className="text-xl font-bold text-gray-800">${room.pricePerNight}</span>
                                    <span className="text-sm text-gray-500 ml-1">/night</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters Section */}
                <div className="w-full lg:w-64 flex-shrink-0 border rounded-2xl p-5 h-fit shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-lg font-semibold text-gray-800">Filters</p>
                        <button className="text-sm text-red-500 hover:underline hidden lg:inline">CLEAR</button>
                    </div>
                    <div className="mb-6 flex flex-col gap-2">
                        <p className="text-sm font-semibold text-gray-800 mb-2">Room Type</p>
                        {roomTypes.map((type) => (
                            <CheckBox
                                key={type}
                                label={type}
                            />
                        ))}
                        </div>
                    <div className="mb-6 flex flex-col gap-2">
                        <p className="text-sm font-semibold text-gray-800 mb-2">Price Range</p>
                        {priceRanges.map((range,index) => (
                            <CheckBox
                                key={index}
                                label={range}
                            />
                        ))}
                        </div>
                    <div className="mb-6 flex flex-col gap-2">
                        <p className="text-sm font-semibold text-gray-800 mb-2">Sort By</p>
                        {sortOptions.map((option,index) => (
                            <CheckBox
                                key={index}
                                label={option}
                            />
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}

export default AllRooms;
