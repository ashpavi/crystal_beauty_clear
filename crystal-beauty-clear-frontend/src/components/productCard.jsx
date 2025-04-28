import { Link } from "react-router-dom"


export default function ProductCard(props) {
    const product = props.product
    

    return(
        <Link to={"/overview/"+product.productId} className="w-[250px] h-[350px] bg-white shadow-md rounded-lg m-3 ">
            <img className="w-full h-[220px] object-cover rounded-t-lg" src ={product.images[0]}/>
            <div className="h-[110px] w-full flex justify-center flex-col p-4">
                <p className="text-[14px] text-gray-400">{product.productId}</p>
                <p className="text-lg font-semibold">{product.name}</p>
                <p className="text-pink-400 text-lg">{product.price.toFixed(2)} <span className="line-through text-[14px] text-gray-400">{product.price<product.labeledPrice&& product.labeledPrice.toFixed(2)}</span></p>
                
            </div>
        </Link>
    )
}