import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import uploadMedia from "../../utils/mediaUpload";

export default function EditProducts(){
    const locationData = useLocation()
    const navigate= useNavigate()
    if(locationData.state == null){
        toast.error("Please selact a product to edit")
        window.location.href = "/admin/products"
    }


    const [productId, setProductId] = useState(locationData.state.productId);
    const [productName, setProductName] = useState(locationData.state.name);
    const [alternativeNames, setAlternativeNames] = useState(locationData.state.alternativeNames.join(","));
    const [price, setPrice] = useState(locationData.state.price);
    const [labeledPrice, setLabeledPrice] = useState(locationData.state.labeledPrice);
    const [description, setDescription] = useState(locationData.state.description);
    const [stock, setStock] = useState(locationData.state.stock);
    const [images, setImages] = useState([]);
    console.log(locationData)

    


   async function HandleSubmit(){

    const promisesArray = []
    for(let i=0; i<images.length; i++){
        const promise = uploadMedia(images[i])
            promisesArray[i]= promise
        
    }
    try{

        const result= await Promise.all(promisesArray)
        
        const alternativeNamesArray = alternativeNames.split(",") //this will seperate the alternatives names with a comma and put them in an array
        const product = {
            productId: productId,
            name: productName,
            alternativeNames: alternativeNamesArray,
            price: price,
            labeledPrice: labeledPrice,
            description: description,
            stock: stock,
            images:result
        }
        console.log(product)
        
        const token= localStorage.getItem("token")
        console.log(token)

        await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/product", product, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            toast.success("Product added successfully")
            navigate("/admin/products")

        }catch(error){
            console.log(error)
            toast.error("File upload failed")
        }

    }
        

       
    


    return(
        <div className="w-full h-full bg-gray-50 flex items-center justify-center rounded-lg">
            <div className="w-[500px] h-[600px] bg-white rounded-lg shadow-lg flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
            <input 
                disabled
                value={productId} 
                onChange={
                    (e)=>{
                        setProductId(e.target.value)
                    }
                }
                className="w-[400px] h-[50px]   border-2 border-gray-400 rounded-xl text-center m-[5px]" 
                placeholder="Product ID"/>
            <input 
                value={productName}
                onChange={
                    (e)=>{
                        setProductName(e.target.value)
                    }
                }
                className="w-[400px] h-[50px]   border-2 border-gray-400 rounded-xl text-center m-[5px]" 
                placeholder="Product Name"/>
            <input 
                value={alternativeNames}
                onChange={
                    (e)=>{
                        setAlternativeNames(e.target.value)
                    }
                }
                className="w-[400px] h-[50px]   border-2 border-gray-400 rounded-xl text-center m-[5px]" 
                placeholder="Alternative Names"/>
            <input 
                value={price}
                onChange={
                    (e)=>{
                        setPrice(e.target.value)
                    }
                }
                type="number"
                className="w-[400px] h-[50px]   border-2 border-gray-400 rounded-xl text-center m-[5px]" 
                placeholder="Price"/>
            <input 
                value={labeledPrice}
                onChange={
                    (e)=>{
                        setLabeledPrice(e.target.value)
                    }
                }
                type="number"
                className="w-[400px] h-[50px]   border-2 border-gray-400 rounded-xl text-center m-[5px]" 
                placeholder="Labeled Price"/>
            <textarea 
                value={description}
                onChange={
                    (e)=>{
                        setDescription(e.target.value)
                    }
                }
                   
                className="w-[400px] h-[50px]   border-2 border-gray-400 rounded-xl text-center m-[5px]" 
                placeholder="Description"/>
                <input 
                value={stock}
                onChange={
                    (e)=>{
                        setStock(e.target.value)
                    }
                }
                type="number"
                className="w-[400px] h-[50px]   border-2 border-gray-400 rounded-xl text-center m-[5px]" 
                placeholder="Stock"/>
            <input 
            type="file"
            multiple
            onChange={
                (e)=>{
                    setImages(e.target.files)
                }
            }
            className="w-[400px] h-[50px] flex justify-center text-center m-[5px] cursor-pointer"
            placeholder="Product Images"

            />
            
            <div className="w-[400px] h-[100px] flex items-center justify-between rounded-lg">
                <Link to="/admin/products" className="w-[180px] bg-red-500 rounded-lg flex items-center justify-center p-[10px] text-white  hover:bg-red-600 cursor-pointer">Cancel</Link>
                <button onClick={HandleSubmit} className="bg-green-500 text-white w-[180px] p-[10px] hover:bg-green-600  ml-[10px] rounded-lg cursor-pointer">Edit Product</button>
            </div>

            </div>

        </div>
    )
}