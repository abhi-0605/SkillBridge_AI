import JobDescription from "../models/JobDescription.js";

export const createJD =async (req,res) =>{
    try{
        const {title, company, rawText} =req.body;

        if(!rawText || rawText.trim().length < 40){
            return res.status(500).json({
                success:false,
                message:'Job description text is too short or missing'
            })
        }

        const jd= await JobDescription.create({
            user:req.user._id,
            title:title || null,
            company:company || null,
            rawText,
            status:'uploaded'
        });

        res.status(201).json({
            success:true,
            data:jd
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
        
}


export const getJDs = async (req,res) =>{
    try{
        const jds=await JobDescription.find({
            user:req.user._id
        }).sort({createdAt:-1});

        res.status(200).json({
            success:true,
            data:jds
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
};