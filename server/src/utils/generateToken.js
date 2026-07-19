import jwt from 'jsonwebtoken';


// Function to generate a JWT token for a given user ID
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_IN || '7d',
    });
};


// Function to set the JWT token in a cookie
export const setTokenCookie = (res, token) => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV ==='production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
}




export default generateToken;