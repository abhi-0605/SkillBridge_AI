import express from "express";
import { generateAIResponse } from "../services/ai/aiProvider.js";


const router = express.Router();

router.post('/ai-test', async(req,res) =>{
    try{
        const { prompt } = req.body;
        const result = await generateAIResponse(prompt);

        res.status(200).json({
            success:true,
            response:result
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})


export default router;