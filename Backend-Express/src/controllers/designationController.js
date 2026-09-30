import Designation from '../models/designationModel.js'

export const getDesignation = async (req,res) => {
    try {
        const designations =  await Designation.find().sort({hierarchyLevel:1});
        res.status(200).json({success:true,data : designations})
        
    } catch (error) {
        res.status(400).json({success:false,message: error.message})
        
    }
}

export const createDesignation = async (req,res) => {
    try {
        const designation = await Designation.create(req.body); 
        res.status(201).json({success:true,data: designation})
    } catch (error) {
        res.status(400).json({success:false,message: error.message})
    }
}

export const getDesignationById = async (req,res) => {
    try {
        const {id} = req.params;
        const designation = await Designation.findById(id);
        res.status(200).json({success:true,data: designation})
    } catch (error) {
        res.status(400).json({success:false,message: error.message})
    }
}