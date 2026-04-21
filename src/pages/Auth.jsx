import { useState } from "react"
import Navbar from "../components/Navbar"
import { AUTH_API } from "../api"

function Auth()
{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogin, setIsLogin] = useState(true)

    async function handleSubmit()
    {
        const url = isLogin
            ? `${AUTH_API}/login`
            : `${AUTH_API}/register`

        try
        {
            const res = await fetch(url,
            {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json()

            if (!res.ok)
            {
                alert(data.error)
                return
            }

            localStorage.setItem("user", email)

            alert(isLogin ? "Login success" : "Register success")
        }
        catch (e)
        {
            console.error(e)
            alert("Server error")
        }
    }

    return (
        <>
            <Navbar />

            <div style={{ padding: 40, color: "white" }}>
                <h2>{isLogin ? "Login" : "Register"}</h2>

                <input
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button onClick={handleSubmit}>
                    Submit
                </button>

                <p onClick={() => setIsLogin(!isLogin)}>
                    Switch
                </p>
            </div>
        </>
    )
}

export default Auth