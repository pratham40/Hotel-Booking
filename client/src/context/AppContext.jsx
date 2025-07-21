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

    async function fetchUser() {
        try {
            // Check if user is authenticated and get token
            const token = await getToken();

            const {data} = await axios.get("/api/users",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if (data.success) {
                setIsOwner(data.role === 'admin');
                setSearchCity(data.recentSerachCities)
            }else{
                setTimeout(()=>{
                    fetchUser();
                },5000)
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            
            toast.error("Failed to fetch user data. Please try again later.");
        }
    }

    useEffect(()=>{
        if (user) {
            fetchUser();
        }
    },[user])

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
        setSearchCity
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=> useContext(AppContext);
