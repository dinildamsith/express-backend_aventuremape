import express from 'express';
import mongoose from 'mongoose';
import BuyerController from "./controller/buyerController";
import GuideController from "./controller/guideController";
import vehicleController from "./controller/vehicleController";
import cors from 'cors';
import imageUploadController from "./controller/imageUploadController";
import orderController from './controller/orderController';


const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({ origin: true })); // Allow all origins

// Connect to MongoDB
mongoose.connect('mongodb+srv://ddamsith17:9JnkaF5zwEAoMOmb@aventuremape.uetls.mongodb.net/?retryWrites=true&w=majority&appName=aventuremape')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// Use the routes for buyer-related actions
app.use('/adventure-map', BuyerController, GuideController, vehicleController, imageUploadController, orderController);

// Start the server
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running and accessible on http://0.0.0.0:${PORT}`);
});
