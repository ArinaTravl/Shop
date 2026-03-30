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
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err))

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
})

const User = mongoose.model("User", UserSchema)


const OrderSchema = new mongoose.Schema({
    wallet: String,
    items: Array,
    total: Number,
    txHash: String,
    userEmail: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.model("Order", OrderSchema)


app.post("/api/register", async (req, res) =>
{
    try
    {
        const { email, password } = req.body

        const existing = await User.findOne({ email })
        if (existing)
        {
            return res.status(400).json({ error: "User already exists" })
        }


        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            email,
            password: hashedPassword
        })

        await user.save()

        res.json({ success: true })
    }
    catch (e)
    {
        console.error(e)
        res.status(500).json({ error: "Registration failed" })
    }
})


app.post("/api/login", async (req, res) =>
{
    try
    {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user)
        {
            return res.status(401).json({ error: "User not found" })
        }


        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch)
        {
            return res.status(401).json({ error: "Wrong password" })
        }

        res.json({ success: true, email })
    }
    catch (e)
    {
        console.error(e)
        res.status(500).json({ error: "Login failed" })
    }
})

app.post("/api/orders", async (req, res) =>
{
    try
    {
        const order = new Order(req.body)
        await order.save()

        res.json({ success: true })
    }
    catch (e)
    {
        console.error(e)
        res.status(500).json({ error: "Failed to save order" })
    }
})

app.listen(5050, () =>
{
    console.log("Server running on http://localhost:5050")
})