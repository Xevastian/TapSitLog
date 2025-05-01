import mongoose from 'mongoose'

const menuShcema = new mongoose.Schema({
    Food_Name:{
        type:String,
        required: true
    },
    Food_Price:{
        type:Number,
        required:true
    },
    rating: {
        type: Number, default: 0 
    },
    image: {
        type: String 
    },
});

const Menu = mongoose.model('menus',menuShcema);

export default Menu;