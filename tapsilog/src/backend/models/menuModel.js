import mongoose from 'mongoose'

const menuSchema = new mongoose.Schema({
    Food_Name:{
        type:String,
        required: true
    },
    Food_Price:{
        type:Number,
        required:true
    },
    Food_Category: {
        type: String,
        required: true,
    },
    Food_Image: {
        type: String 
    },
},
{
    collection: 'menus',
});

const Menu = mongoose.model('menus',menuSchema);

export default Menu;