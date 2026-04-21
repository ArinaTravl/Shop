import { useState } from "react"

function Admin()
{
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")

    const user = localStorage.getItem("user")

    if (user !== "admin@gmail.com")
    {
        return <h2>Access denied</h2>
    }

    function handleAdd()
    {
        alert("Temporary: backend products not implemented yet")
    }

    return (
        <div>
            <h2>Admin</h2>

            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
            <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
            <input placeholder="Image" value={image} onChange={e => setImage(e.target.value)} />

            <button onClick={handleAdd}>
                Add Product
            </button>
        </div>
    )
}

export default Admin