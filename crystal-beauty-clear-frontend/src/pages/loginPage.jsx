import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const navigate= useNavigate();
    const loginWithGoogle= useGoogleLogin(
        {
        onSuccess:(res)=>{
            setLoading(true);
            axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/googleLogin", {
                accessToken: res.access_token
            })
        }
    }
    )

    function handleLogin(){
        setLoading(true);


        // Perform login request to the backend API
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/login", {
            email: email,
            password: password
        }).then((response) => {
            console.log("Login successful:", response.data);
            toast.success("Login successful!");
            localStorage.setItem("token", response.data.token);
            
            const user= response.data.user; 
            if (user.role == "admin") {
                // Redirect to admin page
                navigate("/admin");
            }else{
                // Redirect to user page
                navigate("/");
            }
            setLoading(false);

        }).catch((error) => {
            console.error("Login failed:", error.response.data);
            toast.error(error.response.data.message || "Login failed. Please try again.");
            setLoading(false);
        });
        

        console.log("Login button clicked");
    }

    return(
        <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
            <div className=" w-[50%] h-full ">

            </div>
            <div className=" w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] h-[600px] backdrop-blur-md shadow-2xl rounded-xl flex flex-col justify-center items-center">
                    <input 
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    className="w-[400px] h-[50px]   border-2 border-white rounded-xl text-center m-[5px]" type="email" placeholder="email"/>
                    <input onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    className="w-[400px] h-[50px]  border-2 border-white rounded-xl text-center m-[5px]" type="password" placeholder="password"/>
                    <button onClick={handleLogin} className="w-[400px] h-[50px] bg-green-400 rounded-xl text-center text-white cursor-pointer m-[5px] hover:bg-gray-300">
                        
                        {
                            loading?"Loading...": "Login"
                        }
                        </button>
                    {/* Google Login Button */}
                        <button
                        className="w-[400px] h-[50px] bg-white rounded-xl text-center text-gray-700 cursor-pointer m-[5px] hover:bg-gray-200 flex justify-center items-center gap-2"
                        onClick={loginWithGoogle}
                        >
                        <FcGoogle className="text-xl" />
                        <span>
                            {loading ? "Loading..." : "Login with Google"}
                        </span>
                        </button>
                        <p className="text-gray-700 text-center m-[10px]">
                            Don't have an account yet?
                            &nbsp;
                            <span className="text-green-700 cursor-pointer hover:underline">
                                <Link to="/register">Register</Link>
                            </span>
                        </p>

                </div>

            </div>
        </div>
    )
}