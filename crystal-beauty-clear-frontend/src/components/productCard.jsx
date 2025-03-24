

export default function ProductCard(props) {
    console.log(props)

    return(
        <div className="productCard">
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <p>{props.price}</p>
            <button>Add to Cart</button>    

        </div>
    )
} 