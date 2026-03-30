import { useCart } from "../context/CartContext"
import Navbar from "../components/Navbar"
import { connectWallet, getCurrentAccount, sendPayment } from "../blockchain/wallet"

function Cart()
{
    const { cartItems, removeFromCart, clearCart } = useCart()

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    async function handlePay()
    {
        const user = localStorage.getItem("user")

        if (!user)
        {
            alert("Login first")
            return
        }

        let account = await getCurrentAccount()

        if (!account)
        {
            account = await connectWallet()

            if (!account)
            {
                alert("Wallet required")
                return
            }
        }

        try
        {
            const txHash = await sendPayment(total, account)

            await fetch("http://localhost:5050/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    wallet: account,
                    items: cartItems,
                    total,
                    txHash,
                    userEmail: user
                })
            })

            alert("Payment successful 🚀")

            clearCart()
        }
        catch (e)
        {
            console.error(e)
            alert("Payment failed")
        }
    }

    return (
        <>
            <Navbar />

            <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
                <h2 style={{ color: "white" }}>Your Cart</h2>

                {cartItems.length === 0 && (
                    <p style={{ color: "#aaa" }}>Cart is empty</p>
                )}

                {cartItems.map(item => (
                    <div key={item.id} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        background: "#1a1a1a",
                        padding: "10px",
                        borderRadius: "8px",
                        marginBottom: "10px"
                    }}>
                        <div>
                            <h4 style={{ margin: 0, color: "white" }}>
                                {item.name}
                            </h4>

                            <p style={{ color: "#aaa" }}>
                                {item.price} ETH × {item.quantity}
                            </p>
                        </div>

                        <button
                            onClick={() => removeFromCart(item.id)}
                            style={{
                                background: "#333",
                                border: "none",
                                color: "white",
                                padding: "6px 10px",
                                borderRadius: "6px",
                                cursor: "pointer"
                            }}
                        >
                            Remove
                        </button>
                    </div>
                ))}

                {cartItems.length > 0 && (
                    <div style={{ marginTop: "20px" }}>
                        <h3 style={{ color: "white" }}>
                            Total: {total.toFixed(3)} ETH
                        </h3>

                        <button
                            onClick={handlePay}
                            style={{
                                marginTop: "10px",
                                width: "100%",
                                padding: "10px",
                                background: "#7b5cff",
                                border: "none",
                                borderRadius: "8px",
                                color: "white",
                                cursor: "pointer"
                            }}
                        >
                            Pay with Crypto
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default Cart