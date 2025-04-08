import axios from "axios"
import { useEffect, useState } from "react"
import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";


export default function AdminProductsPage() {
  const [products, setProducts] = useState([])

    useEffect(() => {
      axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then
    (
        (response) => {
          console.log(response.data)
          setProducts(response.data)
        }
      )
    }, 
    [])
  


  return (
    <div className="w-full h-full rounded-lg relative">
      <Link  to="/admin/addProduct" className="bg-gray-600 text-white p-[12px]  absolute rounded-full hover:bg-gray-300 hover:text-gray-800 text-3xl cursor-pointer right-5 bottom-5">
      <TiPlus />
      </Link>
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-2">Product ID</th>
            <th className=" p-2">Name</th>
            <th className=" p-2">Price</th>
            <th className=" p-2">Labeled Price</th>
            <th className=" p-2">Stock</th>
          </tr>

        </thead>
        <tbody>
        {
        products.map(
          (product)=>{
            console.log("Mapping products"+product.productId)
            return(
              <tr key={product.productId} className="border-b-2 border-gray-400 hover:bg-gray-200 text-center cursor-pointer">
                <td className="p-2">{product.productId}</td>
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.price}</td>
                <td className="p-2">{product.labeledPrice}</td>
                <td className="p-2">{product.stock}</td>
              </tr>
            )
          }
        )
      }      
        </tbody>
      </table>
      
    </div>
  )
}

