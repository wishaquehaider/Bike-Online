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
    purchases:[{
        status:Boolean,
        file:String,
        title:String,
        sub_heading:String,
        rating:String,
        price:String,
        userId:String,
        quantity:String,
        date:String,
        installment:String,
        CartInstallment:Array,
        approved:Boolean
    }],
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
    },
    number: {
        type:String,
        // required:true
    },
    file:{
        type:String,
        // required:true
    }
    // status: {
    //     type: Boolean
    // },
       
});

let User = mongoose.model('User',userKaSchema);
module.exports = User;