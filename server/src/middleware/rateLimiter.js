import rateLimit from 'express-rate-limit';

const limitMessage = (message) => ({success: false, message});

//general rate limiter for all requests
export const generalLimiter = rateLimit({
    windowMs: 15*60*1000,
    limit: 100,
    standardHeaders: "draft-6",
    legacyHeaders: false,
    message: limitMessage('Too many requests, please try again after 15 minutes'),
});


//login/register rate limiter(10 requests per 15 minutes)
export const authLimiter = rateLimit({
    windowMs: 15*60*1000,
    limit: 10,
    standardHeaders: "draft-6",
    legacyHeaders: false,
    message: limitMessage('Too many login attempts, please try again after 15 minutes'),
});

//analytics rate limiter(10 requests per 15 minutes)
export const analyticsLimiter = rateLimit({
    windowMs: 15*60*1000,
    limit:10,
    standardHeaders: "draft-6",
    legacyHeaders: false,
    keyGenerator: (req) => String(req.user?.id || "anonymous"),
    message: limitMessage('Analysis limit reached. Please try again after 15 minutes'),
})


