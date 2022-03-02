const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true , unique:true},
    email: { type: String, required: true ,unique:true},
    mobile: { type: String, required: true },
    password: { type: String, required: true, minLength: 6, maxLength: 12 }
},
{
    versionKey: false,
    timestamps:true
});



//while creating and updating
UserSchema.pre("save", function(next) {
    if(! this.isModified("password")) return next();

    const hash = bcryptjs.hashSync(this.password, 8);
    this.password = hash

    return next();
})

UserSchema.methods.checkPassword = function(password) {
    const match = bcryptjs.compareSync(password, this.password);

    return match;
}

//connecting the schema to the users collection
const User = mongoose.model("user", UserSchema);

module.exports = User;