import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Auth from "./pages/Auth"
import Admin from "./pages/Admin"

import { CartProvider } from "./context/CartContext"

function App()
{
    return (
        <CartProvider>
            <BrowserRouter>
                <Routes>

                    <Route path="/" element={<Home />} />

                    <Route path="/cart" element={<Cart />} />

                    <Route path="/auth" element={<Auth />} />

                    <Route path="/admin" element={<Admin />} />

                </Routes>
            </BrowserRouter>
        </CartProvider>
    )
}

export default App