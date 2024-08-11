const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userType:{
        type:String,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    country:{
        type:String,
        required:true
    }
    ,
    state:{
        type:String,
        required:true
    }
    ,
    pincode:{
        type:String,
        required:true
    }

})
const User = mongoose.model('USER', userSchema);
module.exports = User;
