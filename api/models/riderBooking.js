const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const riderBookingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    riderId: [
      {type: mongoose.Types.ObjectId, ref: 'Rider'}
    ],
    userId: [
      {type: mongoose.Types.ObjectId, ref: 'User'}
    ],
    parcelWeight: { type: Number, required: true },
    parcelDesc: { type: String, required: true },
    pickupAddress: { type: String, required: true },
    dropoffAddress: { type: String, required: true },
    distance: { type: Number, required: false },
    statusId: [
      {type: mongoose.Types.ObjectId, ref: 'Status'}
    ],
    receiverName: { type: String, required: true },
    receiverContact: { type: String, required: true }
});

module.exports = mongoose.model('RiderBooking', riderBookingSchema);