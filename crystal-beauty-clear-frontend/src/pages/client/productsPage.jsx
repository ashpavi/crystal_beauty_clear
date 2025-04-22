import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/loader"
import ProductCard from "../../components/productCard"

export default function ProductsPage(){

    const [productList, setProductList] = useState([])
    const [productLoaded, setProductLoaded] = useState(false)

    useEffect(
        ()=>{
            if(!productLoaded){
                
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
                (response) => {
                    console.log(response.data)
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


    return(
        <div className="w-full h-full  ">
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