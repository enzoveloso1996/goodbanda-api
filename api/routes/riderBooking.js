const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const RiderBooking = require("../models/riderBooking");
const Rider = require("../models/rider");
const Booking = require("../models/booking");

//general get
router.get('/', (req, res, next) => {
    RiderBooking.find()
    .select("createdAt gemEarned deduction earned rate booking rider _id")
    .populate('rider', '_Id')
    .populate('booking')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        riderBooking: docs.map(doc => {
          return {
            createdAt: doc.createdAt,
            gemEarned: doc.gemEarned,
            deduction: doc.deduction,
            earned: doc.earned,
            rate: doc.rate,
            booking: doc.booking,
            rider: doc.rider,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/riderBooking/" + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//create
router.post('/', (req, res, next) => {
    Rider.findById(req.body.riderId)
    .then(rider => {
      if (!rider) {
        return res.status(404).json({
          message: "Rider not found"
        });
      }
    })
    Booking.findById(req.body.bookingId)
    .then(booking => {
      if (!booking) {
        return res.status(404).json({
          message: "Booking not found"
        });
      }
    })
    const riderBooking = new RiderBooking({
        _id: new mongoose.Types.ObjectId(),
        rider: req.body.riderId,
        booking: req.body.bookingId,
        rate: req.body.rate,
        earned: req.body.earned,
        deduction: req.body.deduction,
        gemEarned: req.body.gemEarned
    });
    riderBooking
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /riderBooking",
        createdRiderBooking: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//get
router.get('/:riderBookingId', (req, res, next) => {
    const id = req.params.riderBookingId;
    Booking.findById(id)
    .select("createdAt gemEarned deduction earned rate booking rider _id")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            product: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/riderBooking'
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//update
router.patch('/:riderBookingId', (req, res, next) => {
    const id = req.params.riderBookingId;
    RiderBooking.updateMany({_id: id}, {$set: req.body})
        .exec()
        .then(result => {
        res.status(200).json({
            message: 'riderBooking updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/riderBooking/' + id
            }
        });
        })
        .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//delete
router.delete('/:riderBookingId', (req, res, next) => {
  const id = req.params.riderBookingId;
    RiderBooking.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'riderBooking deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:3000/riderBooking',
              body: { Status: 'String' }
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;