function Profile()
{
    const user = localStorage.getItem("user")

    if (!user)
    {
        return <h2>You are not logged in</h2>
    }

    return (
        <div style={{ color: "white" }}>
            <h1>Profile</h1>
            <p>{user}</p>
        </div>
    )
}

export default Profile