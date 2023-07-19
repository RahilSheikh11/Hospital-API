const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please Enter youtname"]
    },
    password: {
        type: String, 
        require: [true,,"Please provide your password"],
        minLength: [6,"Password should be greater then 6 characters"],
    },

});

const Doctor = new mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
