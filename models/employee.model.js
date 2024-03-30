const mongoose = require('mongoose')

var employeeSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:'This field is required'
    },
    email:{
        type:String,
        required:'Invalid Email'
    },
    mobile:{
        type:String,
        required:'Please enter correct mobile number'
    },
    city:{
        type:String
    }
})
employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.')

mongoose.model('employees',employeeSchema)