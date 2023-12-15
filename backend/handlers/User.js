const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BookSchema = require('../models/book')

const user = require('../models/user');
const Cart = require('../models/cart');
const Book = require('../models/book');
const Order = require('../models/order');

require('dotenv').config();

// handel register
exports.register = async(req,res)=>{
try{
   const{email,password} = req.body;
   // test 3le l existance mte3 l email 
   const exist = await user.findOne({email});
   if(exist){
    return res.status(400).json({msg:"email already exist"})
   }
   // bech nabda n3amel el creation du compte
   const newUser = await new user(req.body);
   // cryptage
   const saltRounds = 10;
   const salt = bcrypt.genSaltSync(saltRounds);
   const hash = bcrypt.hashSync(password,salt); // password hashed
   // newUser {name:'',email:'',password:'hashed password'}
   newUser.password = hash 
     newUser.save(); // enregistre l'objet fel database
     res.status(200).json({msg:'user created',newUser})

}catch(err){
    res.status(500).json({msg:'can not create this user'})
}
}





//login
exports.login= async(req,res)=>{
    try {
        const {email,password} = req.body;
        // search for email existance
        const found = await user.findOne({email});
        if(!found){
            return res.status(400).json({msg:"invalid email or password"})
        }
    
        const match = await bcrypt.compare(password,found.password);
        if(!match){
            return res.status(400).json({msg:"invalid email or password"})
        }
        // w ken el pwd ta3mel match (password === found.password)
        // na3tiw el user mte3na token 
         const payload = {id: found._id,email:found.email};
         const token = jwt.sign(payload,process.env.private_key);
         res.status(200).json({msg:"user logged In",token,found})
    } catch (error) {
      console.log(error)
        res.status(500).json({msg:"you can not log in now"})
    }
    }

    // user ya3mel rating 

    exports.rating = async (req, res) => {
        const { _id } = req.user;
        const { star, bookId  } = req.body;
        try {
          const book = await BookSchema.findById(bookId);
          let alreadyRated = book.rate.find(
            (userId) => userId.ratedBy.toString() === _id.toString()
          );
          if (alreadyRated) {
            const updateRating = await BookSchema.updateOne(
              {rate: { $elemMatch: alreadyRated }},
              {$set: { "ratings.$.star": star}},
              {new: true}
            );
            // res.json(updateRating)
          } else {
            const rateBook = await BookSchema.findByIdAndUpdate(
              bookId,
              {
                $push: {
                  rate: {
                    star: star,
                   ratedBy: _id,
                  },
                },
              },
              {new: true}
            );
            res.json(rateBook)
          }
          
          const getallratings = await BookSchema.findById(bookId);
          let totalRating = getallratings.rate.length;
          let ratingsum = getallratings.rate
            .map((item) => item.star)
            .reduce((prev, curr) => prev + curr, 0);
          let actualRating = Math.round(ratingsum / totalRating);
          let finalproduct = await BookSchema.findByIdAndUpdate(
            bookId,
            {totalRating: actualRating},
            { new: true }
          );
         return res.json(finalproduct);
        } catch (error) {
          res.status(500).json({msg:'can not rate this book '});
        }
      };

exports.wishs = async (req, res) => {
        try{
          const { id } = req.user;
          // console.log(id)
          const { bookId  } = req.body;

          // bech nlawej 3le user selon id mte3ou 
          const myUser = await user.findById(id);
          const exist = myUser.wishlist.find((item)=>item.toString()=== bookId);

          // ken book mawjoud fel list bech nfasekou 
          if(exist){
            let User = await user.findByIdAndUpdate(
             id, {$pull : {wishlist : bookId}} ,{new : true}
            )
            return res.status(200).json({msg:"book removed from wishList ",User})
          }
          // ken mech mawjoud bech nzidou
          else{
            let User = await user.findByIdAndUpdate(
              id, 
              {$push : {wishlist : bookId}} ,
              {new : true}
              )
             return res.status(200).json({msg:"book added with sucess",User})
          }
          
          
        } catch(err){
        
          res.status(500).json({msg:"server error while adding book to wishlist"})
        }
          
//get wishlist  de chaque user

exports.myWishList = async(req,res)=>{
          try {
            const {id}= req.user
            // console.log(id)
            let User = await user.findById(id).populate('bookId')
           
           // traja3 el status
            return res.status(200).json({msg:" list of book ",User})
          } catch (error) {
            // traja3 el status
            res.status(500).json({msg:"error "})
          }

        }

        


      }


// create a shopping cart for a user 
exports.userCart =async (req, res) => {
  const { cart } = req.body;
  const { id } = req.user;
  try {
    // tableau feregh bech n7otou fih liste mte3 books à acheter
    let orders = [];
    // nlawjou 3le user selon son id elli jey mel token 
    const currentUser = await user.findById(id);
    // check if user already have product in cart
    const alreadyExistCart = await Cart.findOne({ orderby: currentUser._id });
    // ken li n7eb nzideha lel carte
    if (alreadyExistCart) {
      alreadyExistCart.remove();
    }
// console.log(alreadyExistCart);
    for (let i= 0; i < cart.length; i++) {
      let object = {};
      object.produit = cart[i]._id;
      object.count = cart[i].count;
      let getPrice = await Book.findById(cart[i]._id).select("price").exec();
      object.price = getPrice.price;
      orders.push(object);
    }
    console.log(orders);
    let cartTotal = 0;
    for (let i= 0; i< orders.length; i++) {
      cartTotal = cartTotal + orders[i].price * orders[i].count;
    }
    let newCart = await new Cart({
      orders,
      cartTotal,
      orderby: currentUser?._id,
    }).save();
    // const updatedCart = await User.findByIdAndUpdate(_id,{$push:{cart:newCart}})
    //   // updatedCart.cart.push(newCart).save()
    res.json({newCart});
  } catch (error) {
    res.status(500).json({msg:"can not make a shopping cart"})
  }
};


// finishing our order after creating our cart 

exports.createOrder = async(req,res)=>{

  try{
   const {id} = req.user ;
   const {adress} = req.body ;
   // nlawej 3le objet mte3 user selon id 
  //  const currentUser = await user.findById(id);
   const userCart = await Cart.findOne({orderby :id});
   
   let newOrder = await new  Order({
    orders: userCart.orders,
    orderby : id ,
    adress,
    total : userCart.cartTotal
   }).save()
   await Cart.findOneAndDelete({orderby: id})
  res.status(200).json({msg:"order created with sucess",newOrder})
  }catch(err){
    res.status(500).json({msg:"can not finish this order"})
  }
}