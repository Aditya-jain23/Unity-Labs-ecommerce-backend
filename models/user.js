const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    password: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required : true
    },
    isSeller:{
        type: Boolean,
        required : true
    }
})

userSchema.virtual('id').get(function (){
    return this._id.toHexString();
});
userSchema.set('toJSON',{
    virtuals:true,
});

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;

