import mongoose from 'mongoose';
import Order from './orderModel'

const tableModel = new mongoose.Schema({
    TableID:{
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        auto: true
    },
    Table_Number:{
        type:Number,
        required:true
    },
    QR_Code:{
        type:String,
        required:true
    },
    Orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders',
    }]
})

const Table = mongoose.model('tables',tableModel)

export default Table;