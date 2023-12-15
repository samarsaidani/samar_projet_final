const mongoose = require('mongoose') ;


const UserSchema= new mongoose.Schema({

email:{
    type:String , 
    required:true
},
password:{
    type:String,
    required:true
},
role:{
    type:String,
    default:"user"

}
,
wishlist: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Book"
    } 
        ]


})
module.exports = mongoose.model('User',UserSchema)

