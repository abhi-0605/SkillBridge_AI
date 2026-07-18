import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        resume: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Resume',
            required: true,
        },
        jobDescription: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobDescription',
            required: true,
        },
        keywords: {
            resumeKeywords: [{ type: String }],
            jdKeywords: [{ type: String }],
        },
        skillMatch: {
            matchedSkills: [{ type: String }],
            missingSkills: [{ type: String }],
            extraSkills: [{ type: String }], // Skills present in resume but not in job description
        },
        atsScore: {
            overallScore: { type: Number, min: 0, max: 100, default: null },
            breakdown: {
                keywordMatch: { type: Number, default: null },
                skillMatch: { type: Number, default: null },
                formatting: { type: Number, default: null },
            },
        },
        aiProvider: {
            type: String,
            enum: ['ollama', 'openai', 'claude', 'gemini'],
            default: 'ollama',
        },
        status: {
            type: String,
            enum: ['pending', 'processing', 'completed', 'failed'],
            default: 'pending',
        },
        errorMessage: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Analysis = mongoose.model('Analysis', analysisSchema);

export default Analysis;