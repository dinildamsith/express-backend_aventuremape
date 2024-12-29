import express from 'express';
// @ts-ignore
import { GuideModel } from '../model/guideModel.ts';
import ResponseDto from "../model/response";  // Mongoose model for Guide


const router = express.Router();



// Response DTO instance
const responseDto = new ResponseDto();

// ----------------------- Guide Sign Up -----------------------
router.post('/api/v1/guide/signup', async (req, res) => {
    const { accEmail, accUserName, accPassword, accType } = req.body;

    try {
        // Check if the guide already exists
        const existingGuide = await GuideModel.findOne({ accEmail });
        if (existingGuide) {
            responseDto.setDescription('Guide already exists');
            responseDto.setStatus('FAILED');
            return res.status(400).json(responseDto);
        }

        // Create a new guide
        const newGuide = new GuideModel({ accEmail, accUserName, accPassword, accType });
        await newGuide.save();

        responseDto.setDescription('Guide Created Successfully');
        responseDto.setStatus('SUCCESS');
        return res.status(200).json(responseDto);

    } catch (error) {
        console.error(error);
        responseDto.setDescription('An error occurred during sign up');
        responseDto.setStatus('FAILED');
        return res.status(500).json(responseDto);
    }
});

// ----------------------- Save Guide -----------------------
router.post('/api/v1/guide/save', async (req, res) => {
    const { accEmail, guideImage,guideAbout, guideName, guideAge, guidePrice, languages } = req.body;

    console.log(guideImage)
    try {
        const guideEntity = await GuideModel.findOne({ accEmail });

        if (!guideEntity) {
            responseDto.setStatus('FAILED');
            responseDto.setDescription('Guide not found');
            return res.status(400).json(responseDto);
        }

        if (!guideEntity.guideCode) {
            guideEntity.guideCode = generateUUID(); // Generate unique guide code
            guideEntity.guideImage = guideImage;
            guideEntity.guideName = guideName;
            guideEntity.guideAbout = guideAbout;
            guideEntity.guideAge = guideAge;
            guideEntity.guidePrice = guidePrice;
            guideEntity.languages = languages;

            await guideEntity.save();
            responseDto.setStatus('SUCCESS');
            responseDto.setDescription('Guide Saved Successfully');
            return res.status(200).json(responseDto);
        } else {
            responseDto.setStatus('FAILED');
            responseDto.setDescription('Guide already exists');
            return res.status(400).json(responseDto);
        }
    } catch (error) {
        console.error(error);
        responseDto.setStatus('FAILED');
        responseDto.setDescription('An error occurred while saving the guide');
        return res.status(500).json(responseDto);
    }
});

// ----------------------- Update Guide details -----------------------
router.put('/api/v1/guide/update', async (req, res) => {
    const { accEmail, image, name,about, age, price, languages } = req.body;

    try {
        const guideEntity = await GuideModel.findOne({ accEmail });

        if (!guideEntity) {
            responseDto.setStatus('FAILED');
            responseDto.setDescription('Guide not found');
            return res.status(400).json(responseDto);
        }

        guideEntity.guideImage = image;
        guideEntity.guideName = name;
        guideEntity.guideAge = age;
        guideEntity.guidePrice = price;
        guideEntity.guideAbout = about;
        guideEntity.languages = languages;

        await guideEntity.save();
        responseDto.setStatus('SUCCESS');
        responseDto.setDescription('Guide Updated Successfully');
        return res.status(200).json(responseDto);
    } catch (error) {
        console.error(error);
        responseDto.setStatus('FAILED');
        responseDto.setDescription('An error occurred while updating the guide');
        return res.status(500).json(responseDto);
    }
});

// ----------------------- Update Guide gallery -----------------------
router.put('/api/v1/guide/update-gallery', async (req, res) => {
    const { accEmail, images } = req.body;

    try {
        const guideEntity = await GuideModel.findOne({ accEmail });

        if (!guideEntity) {
            responseDto.setStatus('FAILED');
            responseDto.setDescription('Guide not found');
            return res.status(400).json(responseDto);
        }

        guideEntity.imageGallery = images;


        await guideEntity.save();
        responseDto.setStatus('SUCCESS');
        responseDto.setDescription('Guide Gallery Updated Successfully');
        return res.status(200).json(responseDto);
    } catch (error) {
        console.error(error);
        responseDto.setStatus('FAILED');
        responseDto.setDescription('An error occurred while updating the guide');
        return res.status(500).json(responseDto);
    }
});

// ----------------------- Delete Guide -----------------------
router.delete('/api/v1/guide/delete/:accEmail', async (req, res) => {
    const { accEmail } = req.params;

    try {
        const guideEntity = await GuideModel.findOne({ accEmail });

        if (!guideEntity) {
            responseDto.setStatus('FAILED');
            responseDto.setDescription('Guide not found');
            return res.status(400).json(responseDto);
        }

        guideEntity.guideCode = null;
        guideEntity.guideImage = null;
        guideEntity.guideName = null;
        guideEntity.guideAge = null;
        guideEntity.guidePrice = null;
        guideEntity.languages = [];

        await guideEntity.save();
        responseDto.setStatus('SUCCESS');
        responseDto.setDescription('Guide Deleted Successfully');
        return res.status(200).json(responseDto);
    } catch (error) {
        console.error(error);
        responseDto.setStatus('FAILED');
        responseDto.setDescription('An error occurred while deleting the guide');
        return res.status(500).json(responseDto);
    }
});

// ----------------------- Guide Sign In -----------------------
router.post('/api/v1/guide/sign-in', async (req, res) => {
    const { accEmail, accPassword } = req.body;

    try {
        const guideEntity = await GuideModel.findOne({ accEmail });

        if (guideEntity) {
            if (accPassword === guideEntity.accPassword) {
                responseDto.setStatus('SUCCESS');
                responseDto.setDescription('Login Success');
                responseDto.setData(guideEntity);
                return res.status(200).json(responseDto);
            } else {
                responseDto.setStatus('FAILED');
                responseDto.setDescription('Incorrect password or email');
                return res.status(400).json(responseDto);
            }
        } else {
            responseDto.setStatus('FAILED');
            responseDto.setDescription('Guide not found');
            return res.status(400).json(responseDto);
        }
    } catch (error) {
        console.error(error);
        responseDto.setStatus('FAILED');
        responseDto.setDescription('An error occurred during sign in');
        return res.status(500).json(responseDto);
    }
});

// ----------------------- Selected Guide -----------------------
router.get('/api/v1/guide/selected-guide/:guideEmail', async (req, res) => {
    const { guideEmail } = req.params;

    try {
        const guideEntity = await GuideModel.findOne({ accEmail: guideEmail });

        if (!guideEntity) {
            responseDto.setStatus('FAILED');
            responseDto.setDescription('Guide not found');
            return res.status(400).json(responseDto);
        }

        if (guideEntity.guideCode) {
            responseDto.setStatus('SUCCESS');
            responseDto.setDescription('Selected Guide Retrieved Successfully');
            responseDto.setData(guideEntity);
            return res.status(200).json(responseDto);
        } else {
            responseDto.setStatus('FAILED');
            responseDto.setDescription('Guide Details not available');
            return res.status(400).json(responseDto);
        }
    } catch (error) {
        console.error(error);
        responseDto.setStatus('FAILED');
        responseDto.setDescription('An error occurred while retrieving the guide');
        return res.status(500).json(responseDto);
    }
});

export default router;

// Utility function to generate UUID
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
