import { useState } from "react"

function Register()
{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleRegister(e)
    {
        e.preventDefault()

        const user = {
            email,
            password
        }

        localStorage.setItem("registeredUser", JSON.stringify(user))

        alert("Registration successful")
    }

    return (
        <div>

            <h1>Register</h1>

            <form onSubmit={handleRegister}>

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
                    Register
                </button>

            </form>

        </div>
    )
}

export default Register