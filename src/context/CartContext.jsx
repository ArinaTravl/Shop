import { createContext, useContext, useEffect, useState } from "react"

const CartContext = createContext()

export function CartProvider({ children })
{
    const [cartItems, setCartItems] = useState([])

    useEffect(() =>
    {
        const saved = localStorage.getItem("cart")

        if (saved)
        {
            setCartItems(JSON.parse(saved))
        }
    }, [])

    useEffect(() =>
    {
        localStorage.setItem("cart", JSON.stringify(cartItems))
    }, [cartItems])

    function addToCart(product)
    {
        setCartItems(prev =>
        {
            const existing = prev.find(item => item.id === product.id)

            if (existing)
            {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }

            return [...prev, { ...product, quantity: 1 }]
        })
    }

    function removeFromCart(id)
    {
        setCartItems(prev => prev.filter(item => item.id !== id))
    }

    function clearCart()
    {
        setCartItems([])
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart()
{
    return useContext(CartContext)
}