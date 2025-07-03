import { useEffect, useState } from "react";
import getCart, { addToCart, getTotal, getTotalForLabelledPrice, removeFromCart } from "../../utils/cart"
import { FaTrashAlt } from "react-icons/fa";
import {useNavigate} from "react-router-dom"

export default function CartPage(){

    const [cartLoaded, setCartLoaded] = useState(false)
    const [cart, setCart] = useState([])
    const navigate= useNavigate()
    useEffect(() => {
        if(cartLoaded === false){
            const cart = getCart()
            setCart(cart)
            setCartLoaded(true)
        }
    }, [cartLoaded])

    return(
        <div className="w-full h-full bg-gray-100 flex justify-center p-[40px]">
            <div className="w-[700px]">
                {
                    cart.map((item, index) => {
                        return(
                            <div key={index} className="w-full h-[100px] bg-white shadow-md my-[5px] rounded-lg flex items-center justify-between px-5 mb-5 relative">
                                <button className="absolute right-[-50px] bg-red-500 w-[35px] h-[35px] rounded-full text-white flex cursor-pointer justify-center items-center" 
                                onClick={() => {
                                    removeFromCart(item.productId)
                                    setCartLoaded(false)
                                }}>
                                <FaTrashAlt/>
                                </button>
                                <img src={item.images} className="h-full py-[5px] aspect-square object-cover rounded-lg"/>
                                <div className="h-full max-w-[300px] w-[300px] overflow-hidden flex flex-col justify-center items-start">
                                    <h1 className="text-[20px] font-bold">{item.name}</h1>
                                    <h2 className="text-[16px] font-semibold text-gray-500">{item.alternativeNames.join(" | ")}</h2>
                                    <h2 className="text-[16px] font-semibold text-gray-700">LKR: {item.price.toFixed(2)}</h2>
                                </div>
                                <div className="h-full w-[100px] flex justify-center items-center">
                                    <button className="text-3xl w-[25px] h-[25px] bg-black text-white rounded-lg flex justify-center items-center pb-1 cursor-pointer mx-[7px]"
                                    onClick={() => {
                                        addToCart(item, -1)
                                        setCartLoaded(false)
                                        }
                                    }>
                                    -
                                    </button>
                                    <h2 className="text-[16px] font-semibold text-gray-700">{item.quantity}</h2>
                                    <button className="text-3xl w-[25px] h-[25px] bg-black text-white rounded-lg flex justify-center items-center pb-1 cursor-pointer mx-[7px]"
                                    onClick={() => {
                                        addToCart(item, 1)
                                        setCartLoaded(false)

                                    }}>
                                    +
                                    </button>
                                </div>
                                <div className="h-full w-[100px] flex justify-center items-center">
                                    <h2 className="text-[16px] font-semibold text-gray-700">LKR: {(item.price*item.quantity).toFixed(2)}</h2>
                                </div>
                            </div>
                        )
                    })
                }

                {
                    cart.length === 0 && <div className="text-center text-lg font-semibold">Your cart is empty.</div>
                }

                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-[16px] font-semibold text-end pr-2">Total :</h1>
                    <h1 className="w-[100px] text-[16px] font-semibold text-end pr-2">{getTotalForLabelledPrice().toFixed(2)}</h1>
                </div>
                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-[16px] font-semibold text-end pr-2">Discount :</h1>
                    <h1 className="w-[100px] text-[16px] font-semibold text-end border-b-[2px] pr-2">{(getTotalForLabelledPrice()-getTotal()).toFixed(2)}</h1>
                </div>
                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-[16px] font-semibold text-end pr-2">Net Total :</h1>
                    <h1 className="w-[100px] text-[16px] font-semibold text-end border-b-[4px] border-double pr-2">{getTotal().toFixed(2)}</h1>
                </div>
                <div className="w-full flex justify-end mt-4">
                    <button className="w-[170px] h-[40px] text-[18px] font-semibold text-center shadow-2xl bg-pink-400 text-white pr-2 rounded-lg cursor-pointer" onClick={()=>{
                        navigate("/checkout",
                            {
                                state :{
                                    items : cart
                                }
                            }
                        )
                    }}>Checkout</button>
                </div>

            </div>
            
        </div>
    )
}