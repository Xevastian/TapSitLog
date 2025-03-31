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
    Stocks:{
        type:Number,
        default: 0,
    },
});

const Menu = mongoose.model('menus',menuShcema);

export default Menu;