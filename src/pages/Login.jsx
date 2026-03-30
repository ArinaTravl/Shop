import { useState } from "react"

function Login()
{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleLogin(e)
    {
        e.preventDefault()

        const storedUser = JSON.parse(localStorage.getItem("registeredUser"))

        if (!storedUser)
        {
            alert("User not found")
            return
        }

        if (
            storedUser.email === email &&
            storedUser.password === password
        )
        {
            localStorage.setItem("currentUser", JSON.stringify(storedUser))

            alert("Login successful")
            window.location.reload()
        }
        else
        {
            alert("Wrong email or password")
        }
    }

    return (
        <div>

            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    )
}

export default Login