import { createContext, useState } from "react"

export const UserContext = createContext()

export function UserProvider({ children })
{
    const [user, setUser] = useState(null)

    function login(email)
    {
        const newUser = { email }
        setUser(newUser)
        localStorage.setItem("user", JSON.stringify(newUser))
    }

    function logout()
    {
        setUser(null)
        localStorage.removeItem("user")
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}