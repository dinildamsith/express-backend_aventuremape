import mongoose from "mongoose";

// DataBase Connectivity
mongoose.connect("mongodb+srv://ddamsith17:9JnkaF5zwEAoMOmb@aventuremape.uetls.mongodb.net/?retryWrites=true&w=majority&appName=aventuremape");

const db = mongoose.connection;

db.on('open', () => console.log("Connected to database"));
db.on('error', (err:any) => console.error("MongoDB connection error:", err));

export default mongoose;