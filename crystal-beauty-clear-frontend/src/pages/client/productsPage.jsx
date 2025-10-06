import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/loader"
import ProductCard from "../../components/productCard"


export default function ProductsPage(){

    const [productList, setProductList] = useState([])
    const [productLoaded, setProductLoaded] = useState(false)
    const [search, setSearch] = useState("")

    useEffect(
        ()=>{
            if(!productLoaded){
                
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/").then(
                (response) => {
                    setProductList(response.data)
                    setProductLoaded(true)
                }
            ).catch(error => {
                console.error("Error fetching products:", error);
                setProductLoaded(false);
            })
        }

        },[productLoaded]
    )

    function searchProducts(){
        if(search.length>0){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/search/"+search).then(
                (response) => {
                    setProductList(response.data.products)
                }
            )
        }
    }


    return(
        <div className="w-full h-full  ">
            <div className="w-full p-4 flex items-center justify-center">
                <input type="text" className="w-full max-w-xl border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300" 
                placeholder="Search products..." value={search} onChange={(e)=>setSearch(e.target.value)}/>
                <button className="ml-4 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700" 
                onClick={()=>{               
                    searchProducts()
                    setProductLoaded(false)
                }}>
                    Search</button>
            </div>
            {
                productLoaded?
                <div className="w-full h-full flex flex-wrap items-center justify-center">
                    {
                        productList.map(
                            (product) => {
                                return(
                                    <ProductCard key={product.productId} product={product} />
                                )

                            }
                        )
                    }

                </div>
                :
                <Loader/>
            }

        </div>
    )
}