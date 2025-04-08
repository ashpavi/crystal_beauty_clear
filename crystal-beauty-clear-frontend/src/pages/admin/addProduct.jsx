import { Link } from "react-router-dom";

export default function AddProducts(){
    return(
        <div className="w-full h-full bg-gray-50 flex items-center justify-center">
            <div className="w-[500px] h-[600px] bg-white rounded-lg shadow-lg flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Add Product</h1>
            <input 
                className="w-[400px] h-[50px]   border-2 border-gray-400 rounded-xl text-center m-[5px]" 
                placeholder="Product ID"/>
            <input 
                className="w-[400px] h-[50px]   border-2 border-gray-400 rounded-xl text-center m-[5px]" 
                placeholder="Product Name"/>
            <input 
                className="w-[400px] h-[50px]   border-2 border-gray-400 rounded-xl text-center m-[5px]" 
                placeholder="Alternative Names"/>
            <input 
                className="w-[400px] h-[50px]   border-2 border-gray-400 rounded-xl text-center m-[5px]" 
                placeholder="Price"/>
            <input 
                className="w-[400px] h-[50px]   border-2 border-gray-400 rounded-xl text-center m-[5px]" 
                placeholder="Labeled Price"/>
            <textarea 
                className="w-[400px] h-[50px]   border-2 border-gray-400 rounded-xl text-center m-[5px]" 
                placeholder="Description"/>
            <input 
                className="w-[400px] h-[50px]   border-2 border-gray-400 rounded-xl text-center m-[5px]" 
                placeholder="Stock"/>
            <div className="w-[400px] h-[100px] flex items-center justify-between rounded-lg">
                <Link to="/admin/products" className="w-[180px] bg-red-500 rounded-lg flex p-[10px] text-center text-white  hover:bg-red-600 cursor-pointer">Cancel</Link>
                <button className="bg-green-400 text-white w-[180px] p-[10px] hover:bg-green-500  ml-[10px] rounded-lg cursor-pointer">Add Product</button>
            </div>

            </div>

        </div>
    )
}