import mongoose from "mongoose";

// Define Vehicle Schema
const VehicleSchema = new mongoose.Schema({
    accEmail: { type: String, required: true, unique: true },
    accUserName: { type: String, required: true },
    accPassword: { type: String, required: true },
    accType: { type: String, required: true },
    vehicleCode: { type: String, },
    vehicleImage: [{ type: String }],
    vehicleNumber: { type: String,},
    vehicleBrand: { type: String },
    vehicleType: { type: String },
    vehicleReviews: [{ type: String }],
    rentType: { type: String },
    sheetCount: { type: String },
    rentAmount: { type: String },
    driverCode: { type: String },
    driverImage: { type: String },
    driverName: { type: String },
    driverAge: { type: String },
    driverLicense: { type: String },
    driverLanguages: { type: String },
    driverExperience: { type: String },
    driverReviews: [{ type: String }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

// Create Vehicle Model
const VehicleModel = mongoose.model("Vehicle", VehicleSchema);

export {VehicleModel};
