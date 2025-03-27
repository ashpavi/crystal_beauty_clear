import { Link, Route, Routes } from "react-router-dom";
import { AiFillProduct } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa";

export default function AdminPage(){
    return(
        <div className="w-full h-screen bg-gray-500  flex p-2.5">
            <div className="h-full w-[300px] ">
                <Link to="/admin/users" className="w-[290px] h-[50px] bg-gray-300 rounded-xl flex p-2 items-center m-[5px] hover:bg-gray-400"><FaUsers className="mr-2" />Users</Link>
                <Link to="/admin/products" className="w-[290px] h-[50px] bg-gray-300 rounded-xl flex p-2 items-center m-[5px] hover:bg-gray-400"><AiFillProduct className="mr-2" />Products</Link>
                <Link to="/admin/orders" className="w-[290px] h-[50px] bg-gray-300 rounded-xl flex p-2 items-center m-[5px] hover:bg-gray-400"><FaWpforms className="mr-2"/>Orders</Link>

            </div>
            <div className="h-full bg-white w-[calc(100vw-300px)] rounded-xl">
                <Routes path="/*">
                    <Route path="/users" element={<h1>Users</h1>} />
                    <Route path="/products" element={<h1>Products</h1>} />
                    <Route path="/orders" element={<h1>Orders</h1>} />
                    <Route path="/*" element={<h1>404 Not Found</h1>} />
                </Routes>

            </div>
        </div>
    )   
}

