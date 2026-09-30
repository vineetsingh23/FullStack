import PayScale from '../models/payScaleModel.js'

export const getPayScales = async(req,res)=>{

    try {
        const payscales = await PayScale.find().sort({level:1});
        res.status(200).json({success:true, data:payscales})
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
        
    }
}

export const createPayScale = async(req,res)=>{
    try {
        const payscale = await PayScale.create(req.body);   
        res.status(201).json({success:true,data:payscale})
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }   

}

