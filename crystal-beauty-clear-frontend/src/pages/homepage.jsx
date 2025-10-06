import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./client/productsPage";
import ProductOverview from "./client/productOverview";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkout";
import ForgetPasswordPage from "./client/forgetPassword";
import ContactPage from "./client/contactUs";

// A small, self-contained landing section used for the root 
function HomeLanding() {
  const featured = [
    { id: 1, name: "Classic Leather Bag", price: "₨6,900", img: "/products/bag-1.jpg" },
    { id: 2, name: "Sport Sneakers", price: "₨4,200", img: "/products/shoe-1.jpg" },
    { id: 3, name: "Minimal Watch", price: "₨12,500", img: "/products/watch-1.jpg" },
    { id: 4, name: "Wireless Earbuds", price: "₨7,800", img: "/products/earbuds-1.jpg" },
  ];

  return (
    <main className="container mx-auto px-6 py-10">
      {/* HERO */}
      <section className="rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-8 md:p-12">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
              Shop quality. Ship faster.
            </h1>
            <p className="text-sm md:text-base opacity-90 mb-6">
              Curated products, unbeatable prices — delivered to your door. Discover trending
              collections handpicked for you.
            </p>

            <div className="flex gap-3 items-center">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-indigo-600 font-medium shadow hover:scale-[1.01] transition-transform"
              >
                Browse Products
n              </Link>

              <a
                href="#featured"
                className="inline-block px-4 py-3 border border-white/30 rounded-lg text-sm hover:bg-white/5 transition"
              >
                See featured
              </a>
            </div>

            <div className="mt-6 text-xs opacity-80">Free shipping on orders over ₨10,000</div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="w-full max-w-lg">
              {/* example product mockup — replace with an SVG or image as needed */}
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <img
                  src="/hero-mockup.png"
                  alt="hero mockup"
                  className="w-full h-56 object-cover rounded-lg shadow-lg"
                />
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <img src="/products/thumb-1.jpg" alt="t1" className="rounded-lg h-20 w-full object-cover" />
                  <img src="/products/thumb-2.jpg" alt="t2" className="rounded-lg h-20 w-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH + CATEGORIES */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="col-span-2">
          <label className="relative block">
            <span className="sr-only">Search products</span>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-200 rounded-md py-3 pl-4 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Search products, brands or categories..."
              type="text"
              name="search"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">🔍</span>
          </label>
        </div>

        <div className="flex gap-3 justify-end">
          <button className="px-4 py-3 bg-white border rounded-lg shadow text-sm">Men</button>
          <button className="px-4 py-3 bg-white border rounded-lg shadow text-sm">Women</button>
          <button className="px-4 py-3 bg-white border rounded-lg shadow text-sm">Gadgets</button>
        </div>
      </section>

      {/* FEATURED GRID */}
      <section id="featured" className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Featured for you</h2>
          <Link to="/products" className="text-sm underline">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <Link
              to={`/overview/${p.id}`}
              key={p.id}
              className="block bg-white rounded-lg shadow hover:shadow-lg transform hover:-translate-y-1 transition p-4"
            >
              <div className="aspect-square w-full overflow-hidden rounded-md bg-slate-100 flex items-center justify-center">
                <img src={p.img} alt={p.name} className="object-cover h-full w-full" />
              </div>
              <div className="mt-3">
                <h3 className="font-medium">{p.name}</h3>
                <div className="mt-1 text-sm text-slate-600">{p.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 rounded-xl bg-gradient-to-r from-slate-50 to-white p-6 shadow-inner">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Need help choosing?</h3>
            <p className="text-sm text-slate-600">Our product specialists are ready to help you pick the perfect item.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/contact" className="px-5 py-3 rounded-lg border">Contact us</Link>
            <Link to="/products" className="px-5 py-3 rounded-lg bg-indigo-600 text-white">Shop now</Link>
          </div>
        </div>
      </section>

      <footer className="mt-12 text-center text-sm text-slate-500">© {new Date().getFullYear()} YourShop • All rights reserved</footer>
    </main>
  );
}

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header />

      {/* space for the header height */}
      <div className="pt-6">
        <Routes>
          <Route path="/" element={<HomeLanding />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/overview/:id" element={<ProductOverview />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/reviews" element={<h1 className="p-10">Reviews Page</h1>} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/forget" element={<ForgetPasswordPage />} />
          <Route path="*" element={<h1 className="p-10">404 Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
}
