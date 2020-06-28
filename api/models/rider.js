const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const riderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: false, unique: true },
    address: { type: String, required: true },
    isAvailable: { type: Boolean, default: false },
    currentLat: { type: Number, required: false },
    currentLong: { type: Number, required: false },
    loadBalance: { type: Number, required: false },
    contactNumber: { type: String, required: true, unique: true },
    gems: { type: Number, required: false, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rider', riderSchema);