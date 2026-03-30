import { useState, useEffect } from "react"
import productsData from "../data/products"
import ProductList from "../components/ProductList"
import Navbar from "../components/Navbar"

function Home()
{
    const [category, setCategory] = useState("All")
    const [products, setProducts] = useState([])

    useEffect(() =>
    {
        const localProducts = JSON.parse(localStorage.getItem("products")) || []

        setProducts([...productsData, ...localProducts])
    }, [])

    const filtered =
        category === "All"
            ? products
            : products.filter(p => p.category === category)

    return (
        <>
            <Navbar
                selectedCategory={category}
                onSelectCategory={setCategory}
            />

            <div style={{ padding: "20px" }}>
                <ProductList products={filtered} />
            </div>
        </>
    )
}

export default Home