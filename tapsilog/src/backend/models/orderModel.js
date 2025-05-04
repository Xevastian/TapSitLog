import mongoose from 'mongoose';

const orderModel = new mongoose.Schema({
    Content: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'menus', 
                required: true,
            },
            Food_Name: {
                type: String,
                required: true,
            },
            Food_Price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
        },
    ],
    Total: {
        type: Number,
        default: 0,
    },
    Status: {
        type: String,
        default: 'unpaid',
    },
    OrderedAt: {
        type: Date,
        default: Date.now,
    },
    TableID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tables',
        required: false,
    },
    CustomerNumber: {
        type: Number,
        required: false,
    },  
});

const Order = mongoose.model('orders', orderModel,);

export default Order;