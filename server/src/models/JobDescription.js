import mongoose from 'mongoose';

const jobDescriptionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            trim: true,
            default: null,
        },
        company: {
            type: String,
            trim: true,
            default: null,
        },
        rawdata: {
            type: String,
            required: [true, "Job description text is required"],
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

)