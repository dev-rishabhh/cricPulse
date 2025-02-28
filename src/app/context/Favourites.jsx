"use client"
import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [match, setmatch] = useState(
JSON.parse(localStorage.getItem("match")) || []
    );

    useEffect(()=>{
      localStorage.setItem("match", JSON.stringify(match))
    },[match])

    const addtoFavourites = (item) => {
        if(match.includes(item)){
            toast.error("Match already exists")
            return
        }
        setmatch([...match,item])
        toast.success("Match added sucessfully")
        // console.log(match);

    }
    const removefromFavourites = (item) => {
        setmatch((prev)=>prev.filter(match => match!==item))
        toast.success("Match removed sucessfully")
        // console.log(match);
    }
    return (
        <Context.Provider value={{ match, addtoFavourites,removefromFavourites }}>
            {children}
        </Context.Provider>
    )
}

export const useMatchContext = () => {
    return useContext(Context)
}
