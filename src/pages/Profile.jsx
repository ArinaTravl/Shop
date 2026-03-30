function Profile()
{
    const user = JSON.parse(localStorage.getItem("currentUser"))

    if (!user)
    {
        return <h2>You are not logged in</h2>
    }

    return (
        <div>

            <h1>Profile</h1>

            <p>Email: {user.email}</p>

        </div>
    )
}

export default Profile