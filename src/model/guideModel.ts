import mongoose from "mongoose";

// Define Guide Schema
const GuideSchema = new mongoose.Schema({
    accEmail: { type: String, required: true, unique: true },
    accUserName: { type: String, required: true },
    accPassword: { type: String, required: true },
    accType: { type: String, required: true },
    guideCode: { type: String, required: false },
    guideImage: { type: String },
    guideName: { type: String },
    guideAge: { type: String },
    guidePrice: { type: String },
    languages: { type: String },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

// Create Guide Model
const GuideModel = mongoose.model("Guide", GuideSchema);

export  {GuideModel}
