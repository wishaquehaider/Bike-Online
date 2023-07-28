let mongoose = require('mongoose');
let userKaSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    purchases:[],
    installments:[],
    password:{
        type:String,
        required:true
    },
    reEnter:{
        type:String,
        required:true
    },
    term:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    installment:{
        type: String
    },
    date: {
        type: String
    },
    verificationCode: {
        type: String
    }
});

let User = mongoose.model('User',userKaSchema);
module.exports = User;