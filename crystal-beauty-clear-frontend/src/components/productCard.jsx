

export default function ProductCard(props) {
    const product = props.product

    return(
        <div className="w-[250px] h-[350px] bg-amber-100 shadow-md rounded-lg m-3 ">
            <img className="w-full h-[220px] object-cover rounded-t-lg" src ={product.images[0]}/>
            <div className="h-[110px] w-full">
                <span>{product.name}</span>
                <p>{product.price.toFixed(2)}</p>
                
            </div>
        </div>
    )
} 