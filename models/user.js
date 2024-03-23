const mongoose = require("mongoose");

const user = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        default: ""
    },
    city:{
        type: String,
        default: ""
    },
    pincode:{
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    }
})

const Users = mongoose.model("Users",user);

module.exports = Users;