const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

const UserShema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},
    { timestamps: true }
)


UserShema.pre('save', async function(next)
{
    if(!this.isModified("password")){
        next()
    }
    const salt= await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

UserShema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)

}
const User = mongoose.model('User', UserShema)

module.exports = User