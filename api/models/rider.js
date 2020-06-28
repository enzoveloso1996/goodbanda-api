const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const riderSchema = mongoose.Schema({
    riderId: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: false, unique: false },
    address: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    currentLat: { type: Number, required: false },
    currentLong: { type: Number, required: false },
    loadBalance: { type: Number, required: false },
    contactNumber: { type: String, required: true, unique: true },
    gems: { type: Number, required: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rider', riderSchema);