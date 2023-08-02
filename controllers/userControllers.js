
//This code gives ID in response in postman please check the video is old it will not show in video but will work.







const Doctor = require('../models/doctor');
const Patient = require('../models/Patient');

module.exports.registerDoctor = async (req, res, next) => {
    try {
        const doctor = await Doctor.create(req.body);

        res.status(200).json({
            success: true,
            message: "Doctor created successfully",
            doctorId: doctor._id
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Could not create a doctor, internal server error"
        });
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const user = await Doctor.findOne({ name: req.body.name });

        if (user) {
            const token = jwt.sign({ userId: user._id }, "secret");

            res.status(200).json({
                success: true,
                token,
                doctorId: user._id
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Name or password incorrect"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

module.exports.registerPatient = async (req, res, next) => {
    try {
        req.body.doctor = "64b7ec0dbb2d11db68b2f677";

        const patient = await Patient.create(req.body);
        res.status(200).json({
            success: true,
            message: "Patient registered successfully",
            patientId: patient._id
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "No patient created, internal server error"
        });
    }
};
module.exports.createReport = async (req,res,next) => {
    try {
        const patient = await Patient.findById(req.params.id);

        req.body.date = Date.now();
        patient.reports.push(req.body);

        patient.save();
        
        res.status(200).json({
            success: true,
            message: " could create a report",

        });

    } catch (error) {
        res.status(500).json({
success: false,
message: "could not create a  report, internal server error"
        });
        
    }
};

module.exports.all_reports = async (req,res,next) => {
    try {
  
        const patient = await Patient.findById(req.params.id);


        res.status(200).json({
            success: true,
            reports: patient.reports,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "could not fetch the patient",
        });
    }
};

module.exports.AllReports = async (req,res,next) =>{
try {
    
         const patient = await Patient.find({
            reports: { $elemMatch: { status: req.params.status} },
        });

        res.status(200).json({

            success: true,
            data: patient,
        });

} catch (error) {


    res.status(500).json({
        success: false,
        message: "could not able to fetch reports",


    });
}
    
};









