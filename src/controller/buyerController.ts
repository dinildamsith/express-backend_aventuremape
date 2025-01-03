import express from 'express';
// @ts-ignore
import { BuyerModel } from '../model/buyerModel.ts';  // Import the Mongoose model for Buyer

const router = express.Router();

// Response DTO structure
class ResponseDto {
    status: string;
    description: string;
    data: any;

    constructor() {
        this.status = '';
        this.description = '';
        this.data = null;
    }
}

const responseDTO = new ResponseDto();

// Buyer Sign-Up
router.post('/api/v1/buyer/signup', async (req, res) => {
    const { accEmail, accUserName, accPassword, accType, currency } = req.body;

    try {
        // Check if the buyer already exists
        const existingBuyer = await BuyerModel.findOne({ accEmail });
        if (existingBuyer) {
            responseDTO.status = 'FAILED';
            responseDTO.description = 'Buyer already exists';
            return res.status(400).json(responseDTO);
        }

        // Create a new buyer
        const buyerEntity = new BuyerModel({
            accEmail,
            accUserName,
            accPassword,
            accType,
            currency
        });

        await buyerEntity.save();

        responseDTO.status = 'SUCCESS';
        responseDTO.description = 'Buyer Created Successfully';
        return res.status(200).json(responseDTO);
    } catch (error) {
        console.error(error);
        responseDTO.status = 'FAILED';
        responseDTO.description = 'An error occurred while signing up the buyer';
        return res.status(500).json(responseDTO);
    }
});

// Buyer Sign-In
router.post('/api/v1/buyer/sign-in', async (req, res) => {
    const { accEmail, accPassword } = req.body;

    try {
        // Find the buyer by email
        const buyerEntity = await BuyerModel.findOne({ accEmail });

        if (buyerEntity) {
            // Check if passwords match
            if (accPassword === buyerEntity.accPassword) {
                responseDTO.status = 'SUCCESS';
                responseDTO.description = 'Login Success...';
                responseDTO.data = buyerEntity;
                return res.status(200).json(responseDTO);
            } else {
                responseDTO.status = 'FAILED';
                responseDTO.description = 'Incorrect password or email...';
                return res.status(400).json(responseDTO);
            }
        } else {
            responseDTO.status = 'FAILED';
            responseDTO.description = 'This email has no buyer account';
            return res.status(400).json(responseDTO);
        }
    } catch (error) {
        console.error(error);
        responseDTO.status = 'FAILED';
        responseDTO.description = 'An error occurred while signing in the buyer';
        return res.status(500).json(responseDTO);
    }
});

// sign in buyer details get
router.get('/api/v1/buyer/selected/:accEmail', async (req, res) => {
    const { accEmail } = req.params;

    try {
        // Find the buyer by email
        const buyerEntity = await BuyerModel.findOne({accEmail});

        if (buyerEntity) {
            responseDTO.status = 'SUCCESS';
            responseDTO.description = 'Buyer Get Success';
            responseDTO.data = buyerEntity;
            return res.status(200).json(responseDTO);
        } else {
            responseDTO.status = 'FAILED';
            responseDTO.description = 'Buyer not found';
            return res.status(400).json(responseDTO);
        }


    } catch (error) {
        console.error(error);
        responseDTO.status = 'FAILED';
        responseDTO.description = 'An error occurred while signing in the buyer';
        return res.status(500).json(responseDTO);
    }
});

export default router;
