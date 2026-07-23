import express from "express";
import { generateAIResponse } from "../services/ai/aiProvider.js";
import { extractKeywords } from "../services/agents/keywordExtractor.js";

import { matchSkills } from "../services/agents/skillMatcher.js";

import { calculateATSScore } from "../services/agents/atsScorer.js";

import { generateReport } from "../services/agents/reportGenerator.js";


const router = express.Router();

// Test route for AI response
router.post('/ai-test', async (req, res) => {
    try {
        const { prompt } = req.body;
        const result = await generateAIResponse(prompt);

        res.status(200).json({
            success: true,
            response: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})


// Test route for keyword extraction
router.post('/keyword-test', async (req, res) => {
    try {
        const { text, label } = req.body;
        const keywords = await extractKeywords(text, label);

        res.status(200).json({
            success: true,
            keywords
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

})


// Test route for skill matching
router.post('/skill-match-test', async (req, res) => {
    try {
        const { resumeKeywords, jdKeywords } = req.body;
        const result = matchSkills(resumeKeywords, jdKeywords);

        res.status(200).json({
            success: true,
            result
        })
    } catch (error) {
        res.status(500).json({
            success: false,

            message: error.message,

        })

    };
});


// Test route for ATS scoring
router.post('/ats-score-test', (req, res) => {
    try {
        const { keywordMatchPercentage, skillMatchPercentage, resumeText } = req.body;

        const result = calculateATSScore({ keywordMatchPercentage, skillMatchPercentage, resumeText });
        res.status(200).json({
            success: true,
            result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


router.post('/report-test', async(req,res) =>{
    try{
        const { atsScore, matchedSkills, missingSkills, resumeText, jdText } = req.body;
        const result  = await generateReport({ atsScore, matchedSkills, missingSkills, resumeText, jdText });

        res.status(200).json({
            success: true,
            result
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

export default router;