import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";



export default function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate()

    useEffect(() => {
      if(!loaded){
        axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
        (response) => {
          console.log(response.data)
          setProducts(response.data)
          setLoaded(true)
        }
        ).catch(error => {
          console.error("Error fetching products:", error);
          setLoaded(false);
        });
      }
    }, 
      [loaded] 
  )

    async function deleteProduct(id) {
      const token = localStorage.getItem("token")
      if(token == null){
        toast.error("You are not logged in")
        return
      }
      try{
        await axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/product/"+id, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        setLoaded(false)
        toast.success("Product deleted successfully")
      }
      catch(error){
        console.log(error)
        toast.error("Product deletion failed")
        return
      }
  }

  


  return (
    <div className="w-full h-full rounded-lg relative">
      <Link  to="/admin/addProduct" className="bg-gray-600 text-white p-[12px]  absolute rounded-full hover:bg-gray-300 hover:text-gray-800 text-3xl cursor-pointer right-5 bottom-5">
      <TiPlus />
      </Link>
      {loaded &&<table className="w-full">
        <thead>
          <tr>
            <th className="p-2">Product ID</th>
            <th className=" p-2">Name</th>
            
            <th className=" p-2">Price</th>
            <th className=" p-2">Labeled Price</th>
            <th className=" p-2">Stock</th>
            <th className=" p-2">Actions</th>
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
                <td className="p-2">
                  <div className="w-full h-full justify-center flex">
                  <FaRegTrashAlt 
                  onClick={()=>{
                    deleteProduct(product.productId)
                  }}
                  className="text-[25px] m-[15px] hover:text-red-600"/>
                  <FaPencilAlt 
                  onClick={()=>{
                    navigate("/admin/editProduct/",{
                      state:product
                    })
                  }}
                  className="text-[25px] m-[15px] hover:text-blue-600"/>

                  </div>
                </td>
              </tr>
            )
          }
        )
      }      
        </tbody>
      </table>}
      {
        !loaded && <Loader/>
      }
    </div>
  )
}

