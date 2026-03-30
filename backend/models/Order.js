import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    wallet: String,
    items: Array,
    total: Number,
    txHash: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Order", orderSchema)