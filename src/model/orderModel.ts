import mongoose from "mongoose";

// Define Order Schema
const OrderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    orderType: { type: String, required: true }, // "guide" or "rent vehicle"
    orderDate: { type: String, required: true },
    orderPrice: { type: String, required: true },
    orderStatus: { type: String, required: true },
    orderStartDuration: { type: String },
    orderEndDuration: { type: String },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer' },
    guide: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide' },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }
});

// Create Order Model
const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
