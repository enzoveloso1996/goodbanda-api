const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: [
      {type: mongoose.Types.ObjectId, ref: 'User', required: true}
    ],
    parcelWeight: { type: Number, required: false },
    parcelDesc: { type:String, required: true },
    specialInstructions: { type:String, required: false },
    pickupLat: { type: Number, required: true },
    pickupLong: { type: Number, required: true },
    pickupAddress: { type: String, required: true },
    dropoffLat: { type: Number, required: true },
    dropoffLong: { type: Number, required: true },
    dropoffAddress: { type: String, required: true },
    distance: { type: Number, required: false },
    rate: Number,
    status: [
      {type: mongoose.Types.ObjectId, ref: 'Status', required: true}
    ],
    rider: [
      {type: mongoose.Types.ObjectId, ref: 'Rider', required: true}
    ],
    receiverName: { type: String, required: true },
    receiverContact: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);