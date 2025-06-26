import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    chunk: String, // original text
    embedding: [Number]
})

export const documentModel = mongoose.model('Documents', documentSchema);