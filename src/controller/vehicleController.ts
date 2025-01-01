import express from 'express';
import { VehicleModel } from '../model/vehicleModel';  // Assume you have a Mongoose model for Vehicle
import crypto from 'crypto';
import {GuideModel} from "../model/guideModel";



const router = express.Router();

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


// 1. Vehicle Sign-Up
router.post('/api/v1/vehicle/signup', async (req, res) => {
    const { accEmail, accUserName, accPassword, accType } = req.body;

    try {
        // Check if the vehicle account already exists
        const existingVehicle = await VehicleModel.findOne({ accEmail });
        if (existingVehicle) {
            responseDTO.status = 'FAILED';
            responseDTO.description = 'Vehicle Account already exists';
            return res.status(400).json(responseDTO);
        }

        // Create a new vehicle account
        const vehicleEntity = new VehicleModel({
            accEmail,
            accUserName,
            accPassword,
            accType
        });

        await vehicleEntity.save();

        responseDTO.status = 'SUCCESS';
        responseDTO.description = 'Vehicle Account Created Successfully';
        return res.status(200).json(responseDTO);
    } catch (error) {
        console.error(error);
        responseDTO.status = 'FAILED';
        responseDTO.description = 'An error occurred during vehicle sign-up';
        return res.status(500).json(responseDTO);
    }
});

// 2. Save Vehicle Details
router.post('/api/v1/vehicle/save', async (req, res) => {
    const { accEmail, vehicleImage, vehicleNumber, vehicleBrand, vehicleType, rentType, sheetCount, rentAmount, driverImage, driverName, driverAge, driverLicense,driverLanguages,driverExperience } = req.body;

    try {
        const vehicle = await VehicleModel.findOne({ accEmail });

        if (!vehicle) {
            responseDTO.status = 'FAILED';
            responseDTO.description = 'Vehicle Account not found';
            return res.status(400).json(responseDTO);
        }

        if (vehicle.vehicleCode) {
            responseDTO.status = 'FAILED';
            responseDTO.description = 'Vehicle Details already saved';
            return res.status(400).json(responseDTO);
        }

        // Save vehicle details
        vehicle.vehicleCode = crypto.randomUUID();
        vehicle.vehicleImage = vehicleImage;
        vehicle.vehicleNumber = vehicleNumber;
        vehicle.vehicleBrand = vehicleBrand;
        vehicle.vehicleType = vehicleType;
        vehicle.rentType = rentType;
        vehicle.sheetCount = sheetCount;
        vehicle.rentAmount = rentAmount;

        if (rentType === 'WITH_DRIVER') {
            vehicle.driverCode = crypto.randomUUID();
            vehicle.driverImage = driverImage;
            vehicle.driverName = driverName;
            vehicle.driverAge = driverAge;
            vehicle.driverLicense = driverLicense;
            vehicle.driverLanguages = driverLanguages;
            vehicle.driverExperience = driverExperience;
        }

        await vehicle.save();

        responseDTO.status = 'SUCCESS';
        responseDTO.description = 'Vehicle Details Saved Successfully';
        return res.status(200).json(responseDTO);
    } catch (error) {
        console.error(error);
        responseDTO.status = 'FAILED';
        responseDTO.description = 'An error occurred while saving vehicle details';
        return res.status(500).json(responseDTO);
    }
});

// 3. Update Vehicle Details
router.put('/api/v1/vehicle/update/:accEmail', async (req, res) => {
    const { accEmail } = req.params;
    const { vehicleImage, vehicleNumber, vehicleBrand, vehicleType, rentType, sheetCount, rentAmount } = req.body;

    try {
        const vehicle = await VehicleModel.findOne({ accEmail });

        if (!vehicle) {
            responseDTO.status = 'FAILED';
            responseDTO.description = 'Vehicle Account not found';
            return res.status(400).json(responseDTO);
        }

        if (!vehicle.vehicleCode) {
            responseDTO.status = 'FAILED';
            responseDTO.description = 'Vehicle not found. First add vehicle details';
            return res.status(400).json(responseDTO);
        }

        // Update vehicle details

        if (rentType === 'WITH_DRIVER') {
            vehicle.vehicleImage = vehicleImage;
            vehicle.vehicleNumber = vehicleNumber;
            vehicle.vehicleBrand = vehicleBrand;
            vehicle.vehicleType = vehicleType;
            vehicle.rentType = rentType;
            vehicle.sheetCount = sheetCount;
            vehicle.rentAmount = rentAmount;
        }

        if (rentType === 'WITHOUT_DRIVER') {
            vehicle.vehicleImage = vehicleImage;
            vehicle.vehicleNumber = vehicleNumber;
            vehicle.vehicleBrand = vehicleBrand;
            vehicle.vehicleType = vehicleType;
            vehicle.rentType = rentType;
            vehicle.sheetCount = sheetCount;
            vehicle.rentAmount = rentAmount;
            vehicle.driverCode = null;
            vehicle.driverImage = null;
            vehicle.driverName = null;
            vehicle.driverAge = null;
            vehicle.driverLicense = null;
            vehicle.driverLanguages = null;
            vehicle.driverExperience = null;
        }


        await vehicle.save();

        responseDTO.status = 'SUCCESS';
        responseDTO.description = 'Vehicle Details Updated Successfully';
        return res.status(200).json(responseDTO);
    } catch (error) {
        console.error(error);
        responseDTO.status = 'FAILED';
        responseDTO.description = 'An error occurred while updating vehicle details';
        return res.status(500).json(responseDTO);
    }
});

// 4. Add Driver Details
router.post('/api/v1/vehicle/add-driver/:accEmail', async (req, res) => {
    const { accEmail } = req.params;
    const { driverImage, driverName, driverAge, driverLicense, driverLanguages } = req.body;

    try {
        const vehicle = await VehicleModel.findOne({ accEmail });

        if (!vehicle) {
            responseDTO.status = 'FAILED';
            responseDTO.description = 'Vehicle Account not found';
            return res.status(400).json(responseDTO);
        }

        if (!vehicle.vehicleCode) {
            responseDTO.status = 'FAILED';
            responseDTO.description = 'Vehicle not found. First add vehicle details';
            return res.status(400).json(responseDTO);
        }

        if (vehicle.driverCode) {
            responseDTO.status = 'FAILED';
            responseDTO.description = 'Driver Details already saved';
            return res.status(400).json(responseDTO);
        }

        // Add driver details
        vehicle.driverCode = crypto.randomUUID();
        vehicle.driverImage = driverImage;
        vehicle.driverName = driverName;
        vehicle.driverAge = driverAge;
        vehicle.driverLicense = driverLicense;
        vehicle.driverLanguages = driverLanguages;

        await vehicle.save();

        responseDTO.status = 'SUCCESS';
        responseDTO.description = 'Driver Details Saved Successfully';
        return res.status(200).json(responseDTO);
    } catch (error) {
        console.error(error);
        responseDTO.status = 'FAILED';
        responseDTO.description = 'An error occurred while adding driver details';
        return res.status(500).json(responseDTO);
    }
});

// 5. Update Driver Details
router.put('/api/v1/vehicle/update-driver/:accEmail', async (req, res) => {
    const { accEmail } = req.params;
    const { driverImage, driverName, driverAge, driverLicense, driverLanguages, driverExperience } = req.body;

    try {
        const vehicle = await VehicleModel.findOne({ accEmail });

        if (!vehicle) {
            responseDTO.status = 'FAILED';
            responseDTO.description = 'Vehicle Account not found';
            return res.status(400).json(responseDTO);
        }

        if (!vehicle.vehicleCode) {
            responseDTO.status = 'FAILED';
            responseDTO.description = 'Vehicle not found. First add vehicle details';
            return res.status(400).json(responseDTO);
        }

        if (!vehicle.driverCode) {
            responseDTO.status = 'FAILED';
            responseDTO.description = 'Driver not found. First add driver details';
            return res.status(400).json(responseDTO);
        }

        // Update driver details
        vehicle.driverImage = driverImage;
        vehicle.driverName = driverName;
        vehicle.driverAge = driverAge;
        vehicle.driverLicense = driverLicense;
        vehicle.driverLanguages = driverLanguages;
        vehicle.driverExperience = driverExperience;

        await vehicle.save();

        responseDTO.status = 'SUCCESS';
        responseDTO.description = 'Driver Details Updated Successfully';
        return res.status(200).json(responseDTO);
    } catch (error) {
        console.error(error);
        responseDTO.status = 'FAILED';
        responseDTO.description = 'An error occurred while updating driver details';
        return res.status(500).json(responseDTO);
    }
});

// 6. Vehicle Sign-In
router.post('/api/v1/vehicle/sign-in', async (req, res) => {
    const { accEmail, accPassword } = req.body;

    try {
        const vehicle = await VehicleModel.findOne({ accEmail });

        if (!vehicle) {
            responseDTO.status = 'FAILED';
            responseDTO.description = 'No vehicle account found for this email';
            return res.status(400).json(responseDTO);
        }

        if (vehicle.accPassword === accPassword) {
            responseDTO.status = 'SUCCESS';
            responseDTO.description = 'Login Successful';
            responseDTO.data = vehicle;
            return res.status(200).json(responseDTO);
        } else {
            responseDTO.status = 'FAILED';
            responseDTO.description = 'Incorrect password';
            return res.status(400).json(responseDTO);
        }
    } catch (error) {
        console.error(error);
        responseDTO.status = 'FAILED';
        responseDTO.description = 'An error occurred while signing in';
        return res.status(500).json(responseDTO);
    }
});


router.get('/api/v1/guide/selected-vehicle/:vehicleEmail', async (req, res) => {
    const { vehicleEmail } = req.params;

    try {
        const vehicleEntity = await VehicleModel.findOne({ accEmail: vehicleEmail});

        if (!vehicleEntity) {
            responseDTO.status = 'FAILED';
            responseDTO.description = 'Vehicle not found';
            return res.status(400).json(responseDTO);
        }

        if (vehicleEntity.vehicleCode) {
            responseDTO.status = 'SUCCESS';
            responseDTO.description = 'Selected Vehicle Retrieved Successfully';
            responseDTO.data =vehicleEntity;
            return res.status(200).json(responseDTO);
        } else {
            responseDTO.status = 'FAILED';
            responseDTO.description = 'Vehicle Details not available';
            return res.status(400).json(responseDTO);
        }
    } catch (error) {
        console.error(error);
        responseDTO.status = 'FAILED';
        responseDTO.description = 'An error occurred while retrieving the guide';
        return res.status(500).json(responseDTO);
    }
});

export default router;
