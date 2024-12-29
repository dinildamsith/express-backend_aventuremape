import express from 'express';
import mongoose from 'mongoose';
import BuyerController from "./controller/buyerController";
import GuideController from "./controller/guideController";
import vehicleController from "./controller/vehicleController";
import cors from 'cors';
import imageUploadController from "./controller/imageUploadController";


const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());



// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/adventure-map')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// Use the routes for buyer-related actions
app.use('/adventure-map', BuyerController,GuideController, vehicleController, imageUploadController);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
