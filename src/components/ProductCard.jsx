import { useCart } from "../context/CartContext"

function ProductCard({ product })
{
    const { addToCart } = useCart()

    return (
        <div
            style={{
                background: "#1a1a1a",
                borderRadius: "10px",
                overflow: "hidden"
            }}
        >
            <img
                src={product.image}
                alt={product.name}
                style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover"
                }}
            />

            <div style={{ padding: "12px" }}>
                <h3 style={{ color: "white", margin: 0 }}>
                    {product.name}
                </h3>

                <p style={{ color: "#aaa" }}>
                    {product.price} ETH
                </p>

                <button
                    onClick={() => addToCart(product)}
                    style={{
                        width: "100%",
                        padding: "8px",
                        background: "#333",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Add to cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard