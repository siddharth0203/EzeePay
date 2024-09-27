
const mongoose  = require('mongoose');
mongoose.connect('mongodb+srv://siddharth020300:Siddharth02%40@cluster0.gtek3.mongodb.net/EzeePayProjectDatabase');
//User Schema
var userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        minLength : 3,
    },
    password : {
        type : String,
        required : true,
        minLength : 6
    },
    firstname : {
        type : String,
        required : true,
        maxLength : 50
    },
    lastname : {
        type : String,
        required : true,
        maxLength : 50
    }
})
var User = mongoose.model('users', userSchema);


//Bank Schema
var BankSchema =new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance : {
        type : Number, 
        required : true
    }
})
var Account = mongoose.model('AccountDetails', BankSchema)
module.exports = {User, Account};