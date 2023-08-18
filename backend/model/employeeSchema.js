const mongoose=require('mongoose')
const employeeSchema= mongoose.Schema({
    userId:String,
    name:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
    
});

const employeeModel=mongoose.model('employees',employeeSchema)
module.exports=employeeModel;


