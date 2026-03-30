import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"

function Navbar({ selectedCategory, onSelectCategory })
{
    const { cartItems } = useCart()
    const navigate = useNavigate()

    const user = localStorage.getItem("user")

    const categories = ["All", "Electronics", "Clothes", "Books"]

    function handleLogout()
    {
        localStorage.removeItem("user")
        navigate("/")
        window.location.reload()
    }

    const isAdmin = user === "admin@gmail.com"

    return (
        <div style={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            backdropFilter: "blur(10px)",
            background: "rgba(10,10,10,0.8)",
            borderBottom: "1px solid #222",
            padding: "15px 30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            {/* LOGO */}
            <h2 style={{
                color: "white",
                margin: 0
            }}>
                marketplace
            </h2>

            {/* CATEGORIES */}
            <div style={{
                display: "flex",
                gap: "10px",
                background: "#111",
                padding: "5px",
                borderRadius: "10px"
            }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => onSelectCategory && onSelectCategory(cat)}
                        style={{
                            padding: "6px 12px",
                            borderRadius: "8px",
                            border: "none",
                            cursor: "pointer",
                            background: selectedCategory === cat ? "#7b5cff" : "transparent",
                            color: selectedCategory === cat ? "white" : "#aaa"
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* RIGHT SIDE */}
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "15px"
            }}>
                <Link to="/" style={linkStyle}>
                    Home
                </Link>

                <Link to="/cart" style={linkStyle}>
                    Cart ({cartItems.length})
                </Link>

                {isAdmin && (
                    <Link to="/admin" style={{ ...linkStyle, color: "#ff7b7b" }}>
                        Admin
                    </Link>
                )}

                {!user ? (
                    <Link to="/auth" style={{ ...linkStyle, color: "#7b5cff" }}>
                        Login
                    </Link>
                ) : (
                    <>
                        <span style={{ color: "#7b5cff" }}>
                            {user}
                        </span>

                        <button
                            onClick={handleLogout}
                            style={{
                                background: "#222",
                                border: "1px solid #333",
                                color: "white",
                                padding: "6px 12px",
                                borderRadius: "8px",
                                cursor: "pointer"
                            }}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

const linkStyle =
{
    color: "#aaa",
    textDecoration: "none",
    fontSize: "14px"
}

export default Navbar