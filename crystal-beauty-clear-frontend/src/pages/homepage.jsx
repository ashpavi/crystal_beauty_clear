import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./client/productsPage";
import ProductOverview from "./client/productOverview";
import CartPage from "./client/cart";

export default function HomePage() {
    return(
        <div className="w-full h-screen bg-gray-100 max-h-screen">
            <Header/>
            <div className="w-full h-[calc(100vh-70px)] min-h-[calc(100vh-70px)]">
                <Routes path="/*">
                    <Route path="/" element ={<h1>Home Page</h1>}/>
                    <Route path="/products" element ={<ProductsPage />}/>
                    <Route path="/overview/:id" element ={<ProductOverview />}/>
                    <Route path="/contact" element ={<h1>Contact Page</h1>}/>
                    <Route path="/reviews" element ={<h1>Reviews Page</h1>}/>
                    <Route path="/cart" element ={<CartPage />}/>
                    <Route path="/*" element ={<h1>404 Not Found</h1>}/>
                

                </Routes>
            </div>           
        </div>
    ) 
}