import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import bcrypt from "bcrypt"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Auth DB connected"))
    .catch(err => console.error(err))

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
})

const User = mongoose.model("User", UserSchema)

app.post("/api/register", async (req, res) =>
{
    const { email, password } = req.body

    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ error: "User exists" })

    const hashed = await bcrypt.hash(password, 10)

    await new User({ email, password: hashed }).save()

    res.json({ success: true })
})

app.post("/api/login", async (req, res) =>
{
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: "No user" })

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) return res.status(401).json({ error: "Wrong password" })

    res.json({ success: true, email })
})

app.listen(5051, () =>
{
    console.log("Auth service on 5051")
})