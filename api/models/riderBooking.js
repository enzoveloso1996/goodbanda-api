const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const riderBookingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    rider: [
      {type: mongoose.Types.ObjectId, ref: 'Rider', required: true}
    ],
    user: [
      {type: mongoose.Types.ObjectId, ref: 'User', required: true}
    ],
    booking: [
      {type: mongoose.Types.ObjectId, ref: 'Booking', required: true}
    ],
    rate: Number,
    earned: Number,
    deduction: Number,
    gemEarned: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RiderBooking', riderBookingSchema);