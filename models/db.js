let mongoose = require('mongoose');
try{
    // let connection = mongoose.connect('mongodb://localhost:27017/someDB');
    let connection = mongoose.connect('mongodb+srv://someuser:12345@cluster0.1gcwxan.mongodb.net/').then(function(resp){

    })
    // const connection = mongoose.connect('mongodb+srv://someuser:11223344@cluster0.1gcwxan.mongodb.net/').then(function(resp){
    //     console.log(resp);
    // });
//  mongoose.connect('mongodb://localhost:27017/testing').then(function(resp){
//         console.log(resp);
//     });

    // const connection = mongoose.connect('mongodb://127.0.0.1:27017/somedb');


    // console.log(connection);/
}catch(err){
   console.log(err);
}