import mongoose from "mongoose";

// DataBase Connectivity
mongoose.connect("mongodb://localhost:27017/adventureMap");

const db = mongoose.connection;

db.on('open', () => console.log("Connected to database"));
db.on('error', (err:any) => console.error("MongoDB connection error:", err));

export default mongoose;