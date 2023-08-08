let mongoose = require('mongoose');

let productKaScheema = mongoose.Schema({
    main_title:{
        type:String,
        // required:true
    },title:{
        type:String,
        required:true
    },
    sub_heading:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    file:{
        type:String,
        required:true
    },
    counter: {
        type: Number
    },
    quantity: {
      type: Number
    },
    userId: {
        type: String
    },
    pending: {
        type: Number
    },
    name: {
        type: String
    },
    installments:[],
    // status:{
    //     type:Boolean
    // },
    approved:{
        type:Boolean
    }

})

let Product = mongoose.model('Product',productKaScheema);
module.exports = Product;