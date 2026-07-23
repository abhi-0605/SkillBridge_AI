
import Resume from "../models/Resume.js";

export const createResume = async (req, res) => {
    try {
        const { fileName, fileType, rawText } = req.body;

        if (!rawText || rawText.trim().length < 50) {
            return res.status(400).json({
                success: false,
                message: 'Resume text is too short or missing'
            });
        }

        const resume = await Resume.create({
            user: req.user._id,
            fileName: fileName || 'Pasted resume',
            fileType: fileType || 'pdf',
            rawText,
            status: 'uploaded'
        });

        res.status(201).json({
            success: true,
            data: resume
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

};


export const getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({
            user: req.user._id
        }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: resumes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};
