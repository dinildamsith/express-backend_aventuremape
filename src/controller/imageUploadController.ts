import express, { Request, Response } from "express";
import multer from "multer"; // Simplified import
import path from "path";
import fs from "fs";

const router = express.Router();

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Use the dynamically created directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file names
    },
});
const upload = multer({ storage }); // Simplified multer initialization

// Define a custom request interface to include `file`
interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

// POST route for file upload
router.post("/upload", upload.single("image"), (req: MulterRequest, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    const fileURL:any = `${req.protocol}://${req.get("host")}/adventure-map/uploads/${req.file.filename}`;
    const filePath = fileURL; // Access the uploaded file's path
    res.json({ message: "Image uploaded successfully!", filePath });
});


// GET route to fetch an image by filename
router.get("/uploads/:filename", (req: Request, res: Response) => {
    const { filename } = req.params;

    // Check if the file exists in the 'uploads' folder
    const filePath = path.join(uploadDir, filename);

    // If the file doesn't exist, return a 404 error
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Image not found." });
    }

    // Send the file as a response
    res.sendFile(filePath);
});

export default router;
