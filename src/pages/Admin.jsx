import { useState } from "react"
import Navbar from "../components/Navbar"

function Admin()
{
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")

    const user = localStorage.getItem("user")

    if (user !== "admin@gmail.com")
    {
        return <h2 style={{ color: "white" }}>Access denied</h2>
    }

    function handleAdd()
    {
        const existing = JSON.parse(localStorage.getItem("products")) || []

        const newProduct =
        {
            id: Date.now(),
            name,
            price: Number(price),
            category,
            image
        }

        const updated = [...existing, newProduct]

        localStorage.setItem("products", JSON.stringify(updated))

        alert("Product added 🚀")

        setName("")
        setPrice("")
        setCategory("")
        setImage("")
    }

    return (
        <>
            <Navbar />

            <div style={{
                padding: "20px",
                maxWidth: "400px",
                margin: "0 auto",
                color: "white"
            }}>
                <h2>Admin Panel</h2>

                <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
                <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
                <input placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} />

                <button onClick={handleAdd} style={{ marginTop: "10px" }}>
                    Add Product
                </button>
            </div>
        </>
    )
}

export default Admin