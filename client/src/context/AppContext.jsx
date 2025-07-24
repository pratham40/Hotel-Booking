import axios from 'axios';
import { createContext, use, useContext, useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useUser,useAuth } from "@clerk/clerk-react"
import toast from 'react-hot-toast';

axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL

const AppContext = createContext();

export function AppProvider({children}) {

    const currency = import.meta.env.VITE_CURRENCY || '$';

    const navigate = useNavigate();
    

    const {user} = useUser();

    const {getToken} = useAuth();


    const [isOwner,setIsOwner] = useState(false);

    const [showHotelReg,setShowHotelReg] = useState(false);

    const [searchCity,setSearchCity] = useState([]);

    const [rooms, setRooms] = useState([]);

    async function fetchRooms() {
        try {
            const token = await getToken();
            const {data} = await axios.get("/api/rooms/", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (data.success) {
                setRooms(data.rooms);
                toast.success("Rooms fetched successfully");
            } else {
                toast.error(data.message || "Failed to fetch rooms");
            }
        } catch (error) {
            console.error("Error fetching rooms:", error);
            toast.error("Failed to fetch rooms. Please try again later.");
        }
    }

    async function fetchUser() {
        try {
            // Check if user is authenticated and get token
            const token = await getToken();

            console.log("Fetching user data with token:", token);

            const {data} = await axios.get("/api/users",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if (data.success) {
                setIsOwner(data.role === 'admin');
                setSearchCity(data.recentSerachCities)
                toast.success("User data fetched successfully");
            }else{
                setTimeout(()=>{
                    fetchUser();
                },5000)
            }
        } catch (error) {
            toast.error("Failed to fetch user data. Please try again later.");
        }
    }

    useEffect(()=>{
        if (user) {
            fetchUser();
        }
    },[user])

    useEffect(()=>{
        fetchRooms();
    },[])

    const value = {
        currency,
        navigate,
        user,
        getToken,
        isOwner,
        setIsOwner,
        axios,
        showHotelReg,
        setShowHotelReg,
        searchCity,
        setSearchCity,
        rooms,
        setRooms
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=> useContext(AppContext);
