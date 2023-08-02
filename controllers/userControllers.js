
//DoctorID's made till now to use:
    
// _id
// 64b77fc521b50b017d3fa40b
// name
// "rahil"
// password
// "123456"
// __v
// 0
// _id
// 64b7ec0dbb2d11db68b2f677
// name
// "Rahul"
// password
// "123456"
// __v
// 0
// _id
// 64b7f527960668fb0aece996
// name
// "ajay"
// password
// "123456"
// __v
// 0
// _id
// 64b7f85e1d14f818da8c95ed
// name
// "coding"
// password
// "123456"
// __v
// 0

// Patients made till now:

// _id
// 64b7881d1ac7980669b3b19c
// name
// "Rahilahemad"
// doctor
// 64b77fc521b50b017d3fa40b

// reports
// Array
// __v
// 2
// _id
// 64b7ed155ac56cde9558972b
// name
// "Rahulahemad"
// doctor
// 64b7ec0dbb2d11db68b2f677

// reports
// Array
// __v
// 1
// _id
// 64b7f560960668fb0aece998
// name
// "Abdul"
// doctor
// 64b7ec0dbb2d11db68b2f677

// reports
// Array
// __v
// 1
// _id
// 64b7f60b960668fb0aece9a5
// name
// "Coding ninjas"
// doctor
// 64b7ec0dbb2d11db68b2f677

// reports
// Array
// __v
// 0
// _id
// 64b7f8711d14f818da8c95ef
// name
// "ninjas"
// doctor
// 64b7ec0dbb2d11db68b2f677

// reports
// Array
// __v
// 1
// _id
// 64be35f69bfd48446dfe676c
// name
// "ninjas123"
// doctor
// 64b7ec0dbb2d11db68b2f677

// reports
// Array
// __v
// 1

//Please mention the problem correctly TA you are confusing be elaborate so we both can finish our work brother.












const Doctor = require ('../models/doctor');
const Patient = require ('../models/Patient');


module.exports.registerDoctor = async(req,res,next)=>{
    try {
    const doctor = await Doctor.create(req.body);

    res.status(200).json({
        success: true,
        message: "doctor created successfully",
    })
    } catch (error) {
        res.status(500).json({
            succes: false,
            message:"could not create a doctor, internal server error"
        });
    }
};


module.exports.login = async (req,res,next) => {
    try {
        const user = Doctor.find(req.body);
        if (user){
            const token = jwt.sign(user.id,"secret");

            res.status(200).json ({
                success: true,
                token,
            });       
         }    else {
            res.status(500).json({
                success: false,
                message: "name or password incorrect",
            });
         }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
        });
        
    }
};

module.exports.registerPatient = async (req,res,next) => {
    try {
        req.body.doctor = "64b7ec0dbb2d11db68b2f677";
        
      const patient = await Patient.create(req.body);
       res.status(200).json({
        success: true,
        message: "success",
       });
    } catch (error) {
    res.statuis(500).json({
        success: false,
        message: "No patient created, internal server error",
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
