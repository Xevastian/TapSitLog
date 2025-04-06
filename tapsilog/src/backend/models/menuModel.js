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
    Food_Category:{
        type:String,
        required:true
    },
});

const Menu = mongoose.model('menus',menuShcema);

export default Menu;