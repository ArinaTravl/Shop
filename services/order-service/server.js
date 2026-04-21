import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Order DB connected"))
    .catch(err => console.error(err))

const OrderSchema = new mongoose.Schema({
    wallet: String,
    items: Array,
    total: Number,
    userEmail: String,
    createdAt: { type: Date, default: Date.now }
})

const Order = mongoose.model("Order", OrderSchema)

app.post("/api/orders", async (req, res) =>
{
    await new Order(req.body).save()
    res.json({ success: true })
})

app.listen(5052, () =>
{
    console.log("Order service on 5052")
})