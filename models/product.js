const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0,
    },
    catelogId: {
         type : mongoose.Schema.Types.ObjectId,
         ref:'Catelog'
     }
})
productSchema.virtual('id').get(function (){
    return this._id.toHexString();
});
productSchema.set('toJSON',{
    virtuals:true,
})

exports.Product = mongoose.model('Product', productSchema);
