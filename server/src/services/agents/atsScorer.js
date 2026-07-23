// Basic formatting heuristics — things ATS systems commonly check for
// This is deterministic logic, not AI, for the same reason skill matching isn't AI:
// these are objective, checkable facts about the text, not something requiring language understanding

// Weighted scoring: 40% keyword match + 40% skill match + 20% formatting — reasonable default weights; easy to tune later once you see real results.
const scoreFormatting = (resumeText) => {
    let score = 100;
    const issues = [];

    // penalty for short resumes
    if (resumeText.length < 500) {
        score -= 20;
        issues.push('Resume text seems short — may be missing sections');
    }

    // Check for presence of common sections
    const commonSections = ["experience", "education", "skills"];
    const lowerText = resumeText.toLowerCase();
    const missingSections = commonSections.filter((s) => !lowerText.includes(s));


    if (missingSections.length > 0) {
        score -= 10 * missingSections.length * 10;
        issues.push(`Missing common sections: ${missingSections.join(', ')}`);
    }

    const specialCharRatio = (resumeText.match(/[^\w\s.,\-@]/g) || []).length / resumeText.length;
    if (specialCharRatio > 0.05) {
        score -= 10;
        issues.push('High ratio of special characters may affect ATS parsing');
    }

    return {
        score: Math.max(0, Math.min(100, score)), issues

    }

}


export const calculateATSScore = ({ keywordMatchPercentage, skillMatchPercentage, resumeText }) => {
    const formatting = scoreFormatting(resumeText);


    // Weighted average: keyword match and skill match matter most,
    // formatting is a smaller but still meaningful factor

    const overall = Math.round(
        keywordMatchPercentage * 0.4 +
        skillMatchPercentage * 0.4 +
        formatting.score * 0.2
    )

    return {
        overall,
        breakdown: {
            keywordMatch: keywordMatchPercentage,
            skillMatch: skillMatchPercentage,
            formatting: formatting.score,
        },
        formattingIssues: formatting.issues,
    };

};