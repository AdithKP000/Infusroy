import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const modelSchema = new mongoose.Schema({
    title: { type: String, required: true },
    fileId: { type: mongoose.Schema.Types.ObjectId, required: true },
    fileName: { type: String, required: true },
}, {
    timestamps: true,
  
});
const Model = mongoose.model('Model', modelSchema);
export default Model;