import mongoose from 'mongoose'

const menuShcema = new mongoose.Schema({
    FoodID:{
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        auto: true
    },
    Food_Name:{
        type:String,
        required: true
    },
    Food_Price:{
        type:Number,
        required:true
    },
    Order_Count:{
        type:Number,
        default: 0,
    },
    Status:{
        type:String,
        enum:['available','out of stock'],
        default:'out of stock'
    }
});

const Menu = mongoose.model('menus',menuShcema);

export default Menu;