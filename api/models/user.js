const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    contactNumber: { type: String, required: true, unique: true},
    email: { type: String, required: false, unique: true },
    address: { type: String, required: true },
    currentLat: { type: Number, required: false },
    currentLong: { type: Number, required: false },
    loadBalance: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);