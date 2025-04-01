import mongoose from 'mongoose'

const orderModel = new mongoose.Schema({
    OrderID:{
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        auto: true
    },
    Content:{
        type: Map,
        of:{
            type: Number,
            default: 0,
        },
        default: {},
        keyType: mongoose.Schema.Types.ObjectId,
        ref: 'menus'
    },
    Total:{
        type: Number,
        default: 0,
    },
    Status:{
        type: String,
        enum:['paid','served','unpaid'],
        default:'unpaid'
    },
    OrderedAt:{
        type: Date,
        default: Date.now,
    },
    TableID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tables'
    },
})

const Order = mongoose.model('orders',orderModel)

export default Order;