const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    km: { type: Number, required: true },
    rate: { type: Number, required: true }
});

module.exports = mongoose.model('Rate', rateSchema);