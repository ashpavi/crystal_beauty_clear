import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { useParams } from "react-router-dom"
import Loader from "../../components/loader"
import ImageSlider from "../../components/imageSlider"
import getCart, { addToCart } from "../../utils/cart"


export default function ProductOverview() {

    const params = useParams()
    if(params.id == null){
        window.location.href = "/products"  
    }

    const [product, setProduct] = useState(null)
    const [status, setStatus] = useState("loading")

    useEffect(
        ()=>{
            console.log(import.meta.env.VITE_BACKEND_URL+"/api/product/"+params.id)
            if(status=="loading"){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/"+params.id).then(
                    (response) => {
                        console.log(response)
                        setProduct(response.data.product)
                        setStatus("loaded")
                    }
                ).catch(error => {
                    toast.error("Product not found");
                    setStatus("error");
                })
            }
        },[status]
    )

    return (
        <div className="w-full h-full ">
            {
                status === "loading"&&<Loader/>
            }
            {
                status === "loaded" &&
                    <div className="w-full h-full flex">
                        <div className="w-[50%] h-full  ">
                            <ImageSlider images={product.images}/>

                        </div>
                        <div className="w-[50%] h-full   p-[40px] flex flex-col justify-center items-center">
                            <h1 className="text-3xl font-bold text-center mb-[40px]">{product.name}{" - "}<span className="text-3xl text-gray-500 mr-[20px]">{product.alternativeNames.join(" | ")} </span></h1>
                            
                            <div className="w-full flex justify-center mb-[40px]"> 
                                {
                                    product.labeledPrice>product.price?
                                    <>
                                        <h2 className="text-2xl mr-5">LKR: {product.price.toFixed(2)}</h2>
                                        <h2 className="text-2xl line-through text-gray-400">LKR: {product.labeledPrice.toFixed(2)}</h2>
                                        
                                    </>
                                    :
                                    <>
                                        <h2 className="text-2xl">LKR: {product.price.toFixed(2)}</h2>
                                    </>
                                }

                            </div>
                            
                            <p className="text-lg  font-semibold text-center mb-[40px]">{product.description}</p>
                            <div className="w-full flex justify-center mb-[40px]">
                                <button className="bg-pink-400 text-white w-[200px] h-[50px] rounded-lg hover:bg-pink-500 cursor-pointer" 
                                onClick={()=>{
                                        addToCart(product,1)
                                        toast.success("Added to cart")
                                        console.log(getCart())
                                    }}
                                    >
                                    Add to Cart
                                </button>
                                <button className="bg-pink-400 text-white w-[200px] h-[50px] rounded-lg hover:bg-pink-500 ml-[20px] cursor-pointer">Buy Now</button>
                                </div>



                        </div>
                    </div>
                
            }
            {
                status === "error" && <div>
                    Product not found.
                    </div>
            }
        </div>
    )
}