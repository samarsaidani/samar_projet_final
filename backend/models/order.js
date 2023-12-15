const mongoose = require('mongoose') ;
const orderSchema = new mongoose.Schema(
    {
        orders:[{
            Produit :{
                type : mongoose.Schema.Types.ObjectId ,
                ref:"Book"},
                count :Number ,
              
                            }
        
            
        ],
        paymentIntent:{},
        orderStatus:{
            type:String,
            default:"en cour ",
            enum:[
                "en cour ",
                "traitement de commande",
                "préparation de commande",
                "livraison de commande",
                "livre"
            ],

        },
        orderby:{
            type : mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        adress: String,
        total : {
            type:Number,
            default:0
        }
    }
           
    
)

module.exports = mongoose.model('Orders',orderSchema) ;