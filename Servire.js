let myExpress = require('express');
let myApp = myExpress();
myApp.use(myExpress.json());
let multer = require('multer')
let Product = require('./models/Product');
let User = require('./models/User');
let Details = require('./models/Details');
// const { FaUniversalAccess } = require('react-icons/fa');
require('./models/db');
const nodemailer = require("nodemailer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './servire/uploadFile')
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname);
  }
})

const upload = multer({ storage: storage })

const storage_2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './servire/uploadFile')
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname);
  }
})

const upload_2 = multer({ storage: storage_2 })



myApp.post('/user_add',async function(req,resp){
    let neyaUser = new User(req.body);
    await neyaUser.save();
    resp.end('user add ho gya')
})

myApp.post('/login_data',async function(req,resp){

    let userMillGya = await User.findOne({email:req.body.email , password:req.body.password});
 if(userMillGya){
    resp.json(userMillGya)
 }
});

myApp.post('/create_product',upload.single('file'),async function(req,resp){
    let neyaProduct = new Product();
    neyaProduct.file = req.file.originalname;
    neyaProduct.title = req.body.title;
    neyaProduct.sub_heading = req.body.sub_heading;
    neyaProduct.rating = req.body.rating;
    neyaProduct.price = req.body.price;
    // neyaProduct.color = req.body.color;
    // neyaProduct.shadow = req.body.shadow;
    neyaProduct.main_title = req.body.main_title
    await neyaProduct.save();
    resp.end('product create ho gya ha')
});

myApp.get('/all_products',async function(req,resp){
     let add = await Product.find();
     resp.json(add);
});

myApp.get('/allAdmin_adds',async function(req,resp){
     let add = await Product.find();
     resp.json(add)
});

myApp.post('/cartItem',async function(req,resp){
     console.log(req.body);

     let _id = req.body._id;
     let findedProducts = req.body.productData
 

    let findedUser = await User.findOneAndUpdate(
      { _id: _id }, // Assuming you have the us er ID in the request, change this as needed
      { $push: { purchases: findedProducts } },
      { new: true } // This option returns the updated document
    );

     resp.json(findedUser);
});

myApp.post('/cartBuyProduct',async function(req,resp){
  const { _id, currentId } = req.body;

  let  findedProducts = await Product.findByIdAndUpdate(_id, {userId: req.body.currentId}, { new: true });
  console.log(req.body);
  resp.json(findedProducts);
});







myApp.post('/userAccountPayment',upload.single('file') ,async function (req,resp){
  const installmentData = {
    originalname: req.file.originalname,
    bodyData: req.body,
  };
  let findedUser = await User.findOneAndUpdate(
    { _id: req.body._id }, // Assuming you have the user ID in the request, change this as needed
    { $push: { installments: installmentData } },
    { new: true } // This option returns the updated document
  );

          resp.json(findedUser);
    
});

myApp.get('/currentUserDetailsProducts',async function(req,resp){
  const userAllDetails = await User.find();
  resp.json(userAllDetails)
});

myApp.post('/userDetailsInfo',upload.single('file'), async function(req,resp){
   let userDetails = new Details();
   userDetails.file = req.file.originalname;
   userDetails.name = req.body.name;
   userDetails.email = req.body.email;
   userDetails.numbers = req.body.numbers;
   userDetails.adresses = req.body.adresses;
   userDetails.dateInstallment = req.body.dateInstallment;
   await userDetails.save();

   if(req.file.originalname){
    resp.json( {
      success: true
    })
   }
});

myApp.post('/detailsCard',async function(req,resp){

  const { _id, price, date } = req.body;

  // Update object containing the fields to be updated
  const updateObject = { installment: price, date: date };
  const findedUser = await User.findByIdAndUpdate(_id, updateObject, { new: true });

  // let findedUser = await User.findByIdAndUpdate(req.body._id, { installment: req.body.price },{date:req.body.date}, { new: true });
  resp.json(findedUser)
});


myApp.post('/forgotEmail',async function(req,resp){

  const email = req.body.email;
  const userMillGya = await User.findOne({email:req.body.email});
  if(userMillGya){
    userMillGya.verificationCode = req.body.verificationCode;
    await userMillGya.save();
    resp.json(userMillGya)

    const transporter = nodemailer.createTransport({
        service:'Gmail',
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'wishawan512@gmail.com',
          pass: 'gougjkjeqggboazq'
        }
      });

      const mailOption = {
        from: 'wishawan512@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Email verification code by Wishaque", // plain text body
        html: `Dear User your verification code is ${req.body.verificationCode}`, // html body
      }
      try{
        await transporter.sendMail(mailOption)
      }catch(error){
    // resp.status(500).json({error: 'Failed to send email'});
    console.error('Error sending email:', error);

      }
  }

});


myApp.post('/verifyTokenCheck', async function(req,resp){
  const verificationCode = req.body.token;
  const userMillGya = await User.findOne({verificationCode:verificationCode});
  if(userMillGya){
    resp.json({
      success:true
    })
  }else{
    resp.json({
      success:false
    })
  }
});


myApp.post('/userNewPassword', async function(req,resp){
  const verificationCode = req.body.currentUserToken;
const userMillGya = await User.findOne({verificationCode:verificationCode});
try{
if (!userMillGya) {
  return resp.status(404).json({ success: false, message: 'User not found' });
}

userMillGya.password = req.body.password;
  await userMillGya.save();
  console.log(userMillGya);

  console.log(userMillGya);
  resp.json({ success: true });
} catch (error) {
  resp.status(500).json({ success: false, error: error.message });
}

});


myApp.use(myExpress.static('./build'));
myApp.use(myExpress.static('/uploadFile'));

myApp.listen(3004,function(){
    console.log('servire challing now');
})