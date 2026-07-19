import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        analysis: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'analysis',
            required: true
        },
        summary: {
            type: String,  // The summary of the analysis report
            default: null
        },
        recommendations: [
            {
                type: String,  // Recommendations based on the analysis like this tech stack is good for you, you should learn this skill etc
            },
        ],
        strengths: [
            {
                type: String,  // Strengths identified in the resume based on the analysis
            },
        ],
        weaknesses: [
            {
                type: String,  // Weaknesses identified in the resume based on the analysis 
            },
        ],

        format:{
            type: String,
            enum: ['json','pdf'],
            default: 'null',
        },


    },
    {timestamps: true}
);


const Report =mongoose.model('Report', reportSchema);

export default Report;