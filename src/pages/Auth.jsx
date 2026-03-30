import { useState } from "react"
import Navbar from "../components/Navbar"

function Auth()
{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogin, setIsLogin] = useState(true)

    async function handleSubmit()
    {
        const url = isLogin
            ? "http://localhost:5050/api/login"
            : "http://localhost:5050/api/register"

        try
        {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json()

            if (data.error)
            {
                alert(data.error)
                return
            }

            localStorage.setItem("user", email)

            alert("Success 🚀")
        }
        catch (e)
        {
            console.error(e)
            alert("Error")
        }
    }

    return (
        <>
            <Navbar />

            <div style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#0b0b0b"
            }}>
                <div style={{
                    width: "350px",
                    background: "#1a1a1a",
                    padding: "30px",
                    borderRadius: "12px",
                    boxShadow: "0 0 20px rgba(0,0,0,0.5)"
                }}>
                    <h2 style={{
                        color: "white",
                        marginBottom: "20px",
                        textAlign: "center"
                    }}>
                        {isLogin ? "Login" : "Register"}
                    </h2>

                    <input
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "10px",
                            background: "#111",
                            border: "1px solid #333",
                            borderRadius: "6px",
                            color: "white"
                        }}
                    />

                    <input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "15px",
                            background: "#111",
                            border: "1px solid #333",
                            borderRadius: "6px",
                            color: "white"
                        }}
                    />

                    <button
                        onClick={handleSubmit}
                        style={{
                            width: "100%",
                            padding: "10px",
                            background: "#7b5cff",
                            border: "none",
                            borderRadius: "8px",
                            color: "white",
                            cursor: "pointer",
                            marginBottom: "10px"
                        }}
                    >
                        {isLogin ? "Login" : "Register"}
                    </button>

                    <p
                        onClick={() => setIsLogin(!isLogin)}
                        style={{
                            color: "#aaa",
                            textAlign: "center",
                            cursor: "pointer",
                            fontSize: "14px"
                        }}
                    >
                        {isLogin
                            ? "Don't have an account? Register"
                            : "Already have an account? Login"}
                    </p>
                </div>
            </div>
        </>
    )
}

export default Auth