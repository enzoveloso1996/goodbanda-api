const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const riderBookingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    riderId: [
      {type: mongoose.Types.ObjectId, ref: 'Rider', required: true}
    ],
    userId: [
      {type: mongoose.Types.ObjectId, ref: 'User', required: true}
    ],
    bookingId: [
      {type: mongoose.Types.ObjectId, ref: 'Booking', required: true}
    ],
    rate: Number,
    earned: Number,
    deduction: Number,
    gemEarned: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RiderBooking', riderBookingSchema);