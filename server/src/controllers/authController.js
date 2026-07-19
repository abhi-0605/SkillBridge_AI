
import User from "../models/User.js";
import generateToken, {setTokenCookie} from "../utils/generateToken.js";


export const register = async (req, res) => {
    try{
        const {name,email,password} = req.body;

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        const user = await User.create({name,email,password, authProvider  : 'local'});
        const token = generateToken(user._id);
        setTokenCookie(res, token);

        res.status(201).json({
            success: true,
            data: {
                id: user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            },
            token,
        });

    }catch(error){
        console.error(error)
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// post /api/auth/login

export const login = async (req, res) => {
    try{
        const {email,password} = req.body;

        const user=await User.findOne({email}).select('+password');
        if(!user || !user.password){
            return res.status(401).json({
                success: false,
                message : 'Invalid email or password'
            });
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message : 'Invalid email or password'
            });
        }

        const token = generateToken(user._id);
        setTokenCookie(res, token);

        res.status(200).json({
            success: true,
            data:{
                id: user._id,  
                name:user.name,
                email:user.email,
                role:user.role,
            },
            token,
        });

            
    }catch(error){
        // console.error(error)
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
       
};

 

// post /api/auth/logout
export const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: 'Logged out successfully',
    });
}


// get /api/auth/me
export const getMe = async (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
        },
    });
}

