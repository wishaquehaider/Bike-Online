let mongoose = require('mongoose');

let detailsKaScheema = mongoose.Schema({
    file:{
        type:String,
        required:true
    },name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    numbers:{
        type:String,
        required:true
    },
    adresses:{
        type:String,
        required:true
    },
    dateInstallment:{
        type:String,
        required:true
    },

})

let Details = mongoose.model('Details',detailsKaScheema);
module.exports = Details;