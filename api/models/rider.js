const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const riderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    userName: { type: String, required: false },
    password: { type: String, required: true },
    email: { type: String, required: false, unique: false },
    isAvailable: { type: Boolean, default: true },
    currentLat: { type: Number, required: true },
    currentLong: { type: Number, required: true },
    loadBalance: { type: Number, required: false },
    contactNumber: { type: String, required: true, unique: true },
    gems: { type: Number, required: false }
});

module.exports = mongoose.model('Rider', riderSchema);