import mongoose from 'mongoose';

const tableModel = new mongoose.Schema({
    Table_Number:{
        type:Number,
        required:true
    },
    Orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders',
        default: []
    }]
})

const Table = mongoose.model('tables',tableModel)

export default Table;