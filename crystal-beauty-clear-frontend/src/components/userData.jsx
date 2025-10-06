import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function UserData(){
    const[user,setUser] =useState(null);
    const token = localStorage.getItem("token");

    useEffect(()=>{
            if(token !=null){
                axios.get(import.meta.env.VITE_BACKEND_URL +"/api/user/getUser",{
                    headers:{
                        Authorization : "Bearer "+token,
                    },
                }).then((response)=>{
                    setUser(response.data.user);
                }
                ).catch((e)=>{
                console.log(e)
                setUser(null);
                })

            }      
    },[])

    return(
        <>
        {user==null ? (
            <div className="h-full flex items-center justify-center flex-row">
                <Link to="/login" className="text-accent mx-2">Login</Link>
                <Link to="/register" className="text-accent mx-2">Register</Link>
            </div>
        ) : (
            <div className="h-full flex items-center justify-center flex-row">
                <span className="text-accent mx-2">Welcome, {user.name}</span>
                <button className="text-accent mx-2" onClick={()=>{
                    localStorage.removeItem("token");
                    setUser(null);
                    window.location.href="/login";
                }}>Logout</button>
            </div>
        )}
    </>
    )
}