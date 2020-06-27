const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    status: { type: String, required: true }
});

module.exports = mongoose.model('Status', statusSchema);