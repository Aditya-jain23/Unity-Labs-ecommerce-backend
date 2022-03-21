const mongoose = require('mongoose');

const catelogSchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    productId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Product'
    }]
})
catelogSchema.virtual('id').get(function (){
    return this._id.toHexString();
});
catelogSchema.set('toJSON',{
    virtuals:true,
})

exports.Catelog = mongoose.model('Catelog', catelogSchema);
