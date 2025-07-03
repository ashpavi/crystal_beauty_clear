export default function getCart(){
    let cart =localStorage.getItem("cart")

    if(cart== null){
        cart=[]
        localStorage.setItem("cart",JSON.stringify(cart))      // set the cart - should be converted to a string when saving to local storage
        return[]
    }

    cart=JSON.parse(cart) // convert the string back to an array when getting from local storage
    return cart
       
}

export  function addToCart(product, qty){
    let cart=getCart()
    

    const productIndex = cart.findIndex((prdct) => prdct.productId === product.productId)

    if (productIndex === -1) {

        cart.push(
            {
                productId: product.productId,
                name: product.name,
                alternativeNames: product.alternativeNames,
                price: product.price,
                labeledPrice: product.labeledPrice,
                images: product.images[0],
                quantity: qty,

                
             }
            )
    } else {

        cart[productIndex].quantity += qty
        if(cart[productIndex].quantity <= 0) {
            cart = cart.filter((prdct) => prdct.productId !== product.productId)
        } 
        }

    localStorage.setItem("cart", JSON.stringify(cart)) // update the cart in local storage
    return cart
}

export function removeFromCart(productId){
    let cart = getCart()
    cart = cart.filter((product) => product.productId !== productId)
    localStorage.setItem("cart", JSON.stringify(cart)) // update the cart in local storage
    return cart         

}

export function getTotal(){
    let cart = getCart()
    let total=0
    cart.forEach((product)=> {
        total += product.price*product.quantity
    })
    return total
}

export function getTotalForLabelledPrice(){
    let cart = getCart()
    let total=0
    cart.forEach((product)=> {
        total += product.labeledPrice *product.quantity
    })
    return total

}