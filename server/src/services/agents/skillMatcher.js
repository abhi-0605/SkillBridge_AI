// normalize a string by converting it to lowercase, trimming whitespace, and removing certain punctuation characters
const normalize = (str) => str.toLowerCase().trim().replace(/[.\-_]/g, '');


export const matchSkills = (resumeKeywords, jdKeywords) => {
    const normalizedResume = resumeKeywords.map((k) => ({ original: k, norm: normalize(k) }));
    const normalizedJD = jdKeywords.map((k) => ({ original: k, norm: normalize(k) }));

    const resumeNormSet = new Set(normalizedResume.map((k) => k.norm));
    const jdNormSet = new Set(normalizedJD.map((k) => k.norm));

    const matchedSkills = normalizedJD
        .filter((jd) => resumeNormSet.has(jd.norm))
        .map((jd) => jd.original);

    const missingSkills = normalizedJD
        .filter((jd) => !resumeNormSet.has(jd.norm))
        .map((jd) => jd.original);

    const extraSkills = normalizedResume
        .filter((res) => !jdNormSet.has(res.norm))
        .map((res) => res.original);

    const matchPercentage = jdKeywords.length>0 
    ? Math.round((matchedSkills.length / jdKeywords.length) * 100)
    : 0;

    return{
        matchedSkills,
        missingSkills,
        extraSkills,
        matchPercentage
    };
};