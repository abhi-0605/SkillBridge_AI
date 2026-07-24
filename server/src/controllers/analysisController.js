import Resume from "../models/Resume.js";
import JobDescription from "../models/JobDescription.js";
import Analysis from "../models/Analysis.js";
import Report from "../models/Report.js";

import { extractKeywords } from "../services/agents/keywordExtractor.js";
import { matchSkills } from "../services/agents/skillMatcher.js";
import { calculateATSScore } from "../services/agents/atsScorer.js";
import { generateReport } from "../services/agents/reportGenerator.js";

// @route  POST /api/analysis
// @body   { resumeId, jdId }
export const createAnalysis = async (req, res) => {
    try {
        const { resumeId, jdId } = req.body;

        if (!resumeId || !jdId) {
            return res.status(400).json({
                success: false,
                message: "resumeId and jdId are required"
            })
        }


        //Step 1: Fetch resume + JD, confirm they belong to this user
        const resume = await Resume.findOne({ _id: resumeId, user: req.user._id });
        const jd = await JobDescription.findOne({ _id: jdId, user: req.user._id });

        if (!resume || !jd) {
            return res.status(404).json({
                success: false,
                message: "Resume or Job Description not found "
            })
        }



        // Step 2: Create a pending Analysis record immediately (so frontend can poll/show loading state later if needed)
        let analysis = await Analysis.create({
            user: req.user._id,
            resume: resume._id,
            jobDescription: jd._id,
            status: "processing",
            aiProvider: process.env.AI_PROVIDER || "ollama",
        });


        // step-3 : run the analysis pipeline: extract keywords, match skills, calculate ATS score, generate report
        const resumeKeywords = await extractKeywords(resume.rawText, "resume");
        const jdKeywords = await extractKeywords(jd.rawText, "job description");

        const skillMatchResult = matchSkills(resumeKeywords, jdKeywords);

        const atsResult = calculateATSScore({
            keywordMatchPercentage: skillMatchResult.matchPercentage,
            skillMatchPercentage: skillMatchResult.matchPercentage,
            resumeText: resume.rawText,
        });

        // console.log("ATS RESULT:", JSON.stringify(atsResult, null, 2));


        const reportResult = await generateReport({
            atsScore: atsResult.overall,
            matchedSkills: skillMatchResult.matchedSkills,
            missingSkills: skillMatchResult.missingSkills,
            resumeText: resume.rawText,
            jdText: jd.rawText,
        })


        // Step 4: Update the Analysis record with results and mark as completed

        analysis.keywords = {
            resumeKeywords,
            jdKeywords,
        };

        analysis.skillMatch = {
            matchedSkills: skillMatchResult.matchedSkills,
            missingSkills: skillMatchResult.missingSkills,
            extraSkills: skillMatchResult.extraSkills,
        };

        analysis.atsScore = {
            overall: atsResult.overall,
            breakdown: atsResult.breakdown,
        };

        analysis.status = "completed";
        await analysis.save();

        // Step 5: Create a Report document

        const report = await Report.create({
            user: req.user._id,
            analysis: analysis._id,
            summary: reportResult.summary,
            strengths: reportResult.strengths,
            weaknesses: reportResult.weaknesses,
            recommendations: reportResult.recommendations,
            format: "json",
        });


        // Step 6: Return the analysis and report results to the frontend

        res.status(200).json({
            success: true,
            data: {
                analysis,
                report,
            },
        });


    } catch (error) {
        console.error("Analysis pipeline error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Analysis failed",
        })

    };
};


// @route  GET /api/analysis
export const getAnalyses = async (req, res) => {
    try {
        const analyses = await Analysis.find({ user: req.user._id })
            .populate("resume", "fileName")
            .populate("jobDescription", "title company")
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: analyses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



// @route  GET /api/analysis/:id

export const getAnalysisById = async (req, res) => {
    try {
        const analysis = await Analysis.findOne({ _id: req.params.id, user: req.user._id })
            .populate("resume")
            .populate("jobDescription");

        if (!analysis) {
            return res.status(404).json({ success: false, message: "Analysis not found" });
        }

        const report = await Report.findOne({ analysis: analysis._id });

        res.status(200).json({
            success: true,
            data: {
                analysis,
                report
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};