import Designation from '../models/designationModel.js'

export const getDesignation = async (req,res) => {
    try {
        const designations =  await Designation.find().sort({hierarchyLevel:1});
        res.status(200).json({success:true,data : designations})
        
    } catch (error) {
        res.status(400).json({success:false,message: error.message})
        
    }
}