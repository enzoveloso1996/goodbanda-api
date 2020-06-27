const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    userName: { type: String, required: false },
    password: { type: String, required: true },
    contactNumber: { type: String, required: true, unique: true},
    email: { type: String, required: false, unique: false },
    currentLat: { type: Number, required: true },
    currentLong: { type: Number, required: true },
    loadBalance: { type: Number, required: true },
});

module.exports = mongoose.model('User', userSchema);