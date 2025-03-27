export default function LoginPage(){
    return(
        <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
            <div className=" w-[50%] h-full ">

            </div>
            <div className=" w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] h-[600px] backdrop-blur-md shadow-2xl rounded-xl flex flex-col justify-center items-center">
                    <input className="w-[400px] h-[50px]   border-2 border-white rounded-xl text-center m-[5px]" type="email" placeholder="email"/>
                    <input className="w-[400px] h-[50px]  border-2 border-white rounded-xl text-center m-[5px]" type="password" placeholder="password"/>
                    <button className="w-[400px] h-[50px] bg-green-400 rounded-xl text-center text-white cursor-pointer m-[5px] hover:bg-gray-300">Login</button>

                </div>

            </div>
        </div>
    )
}