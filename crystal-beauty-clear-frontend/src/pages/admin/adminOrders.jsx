import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";


export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [modelDisplaying, setModelDisplaying] = useState(false);
    const [displayOrder, setDisplayOrder] = useState(null);

    useEffect(()=>{
        if(!loaded){
            const token = localStorage.getItem("token");
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
                headers: {
                    Authorization : "Bearer " + token
                }
                }).then(
                (response) => {
                    setOrders(response.data);
                    setLoaded(true);
                    console.log(response.data);
                    
                }
                )
        }
    },[loaded])

    function updateOrderStatus(orderID, status) {
        const token = localStorage.getItem("token")
        axios.put(import.meta.env.VITE_BACKEND_URL + "/api/order/" + orderID, { status: status },{
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(()=>{
            toast.success("Order status updated successfully");
            setLoaded(false);
        }).catch((error)=>{
            toast.error("Failed to update order status");
        })
    }

   
    return (
        <div className="w-full h-full ">
            
            {
                loaded?
                <div className="w-full h-full">
                    <table className="w-full">
                    <thead>
                        <tr>
                            <th >Order ID</th>
                            <th >Email</th>
                            <th >Name</th>
                            <th >Address</th>
                            <th >Status</th>
                            <th >Phone No</th>
                            <th >Total</th>
                            <th >Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        orders.map(
                            (order) => {
                                return(
                                    <tr key={order.orderID} className="border-b-2 border-gray-300 text-center  "
                                    >
                                        <td className="p-2">{order.orderID}</td>
                                        <td className="p-2">{order.email}</td>
                                        <td className="p-2">{order.name}</td>
                                        <td className="p-2">{order.phoneNo}</td>
                                        <td className="p-2">{order.address}</td>
                                        <td className="p-2">
                                            <select value={order.status} className="z-[50] cursor-pointer" 
                                            onChange={(e) => updateOrderStatus(order.orderID, e.target.value)}>
                                                <option value="Pending">Pending</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="p-2">{order.total.toFixed(2)}</td>
                                        <td className="p-2">{new Date(order.date).toLocaleDateString()}</td>
                                        <td className="p-2">
                                            <button className="bg-gray-500 text-white p-2 rounded cursor-pointer"
                                            onClick={()=>
                                            {
                                                setDisplayOrder(order);
                                                setModelDisplaying(true);
                                            }}>
                                                Details</button>
                                        </td>
                                    </tr>
                                )
                            }
                        )
                    }
                    </tbody>
                    </table>
                    {
                        modelDisplaying &&
                        <div className="fixed top-0 left-0 w-full h-full bg-[#00000080] flex justify-center items-center z-50">
                            <div className="bg-white p-2 rounded-lg  w-[600px] h-[600px] max-h-[600px] relative">
                                <div className="w-full h-[150px]   ">
                                    <h1 className="text-sm font-bold  p-2">Order ID: {displayOrder.orderID}</h1>
                                    <h1 className="text-sm font-bold  p-2">Date: {new Date(displayOrder.date).toLocaleDateString()}</h1>
                                     <h1 className="text-sm font-bold  p-2">Status: {displayOrder.status}</h1>
                                    <h1 className="text-sm font-bold  p-2">Total: {displayOrder.total.toFixed(2)}</h1>
                                </div>
                                
                                <div className="w-full h-[400px] max-h-[400px] overflow-y-scroll">
                                    {
                                        displayOrder.billItems.map((item ,index) =>{
                                            return(
                                                <div key={index} className="w-full h-[100px] bg-white shadow-2xl my-[5px] flex justify-between items-center relative">
                                                    <img src={item.images} className="h-full aspect-square object-cover"/>
                                                    <div className="h-full w-[300px] max-w-[300px] overflow-hidden">
                                                        <h1 className="text-sm font-bold p-2">{item.productName}</h1>
                                                        <h2 className="text-sm font-bold p-2">Price: LKR {item.price.toFixed(2)}</h2>
                                                        <h2 className="text-sm font-bold p-2">Quantity: {item.quantity}</h2>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    
                                </div>
                                <button className="w-[30px] h-[30px] bg-gray-300 rounded-full flex justify-center items-center absolute top-[-40px] right-[-40px] hover:bg-gray-400"
                                onClick={() => setModelDisplaying(false)}>
                                    <IoClose />
                                </button>
                            </div>
                        </div>
                    }

                </div>
                :
                <Loader/>
            }
            
        </div>
    );
}