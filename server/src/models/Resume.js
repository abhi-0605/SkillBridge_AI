import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        fileName: {
            type: String,
            required: true,
        },
        fileType: {
            type: String,
            enum: ['pdf', 'docx'],
            required: true,
        },
        rawdata: {
            type: String,
            required: [ true, "Extracted resume text is required" ],
        },
        parsedData: {

            type: mongoose.Schema.Types.Mixed,
            default: null,
        },
        status: {
            type: String,
            enum: ['uploaded', 'parsed', 'failed'],
            default: 'uploaded',
        },
    
    },
    {
        timestamps: true,
    }

);


const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;