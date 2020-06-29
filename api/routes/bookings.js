const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Booking = require("../models/booking");
const User = require("../models/user");
const Rider = require("../models/rider");
const Status = require("../models/status");

//general get
router.get('/', (req, res, next) => {
    Booking.find()
    .select("createdAt receiverContact receiverName rider status rate distance dropoffAddress dropoffLong dropoffLat pickupAddress pickupLong pickupLat specialInstructions parcelDesc parcelWeight user _id")
    .populate('user')
    .populate('rider',)
    .populate('status', 'status')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        bookings: docs.map(doc => {
          return {
            createdAt: doc.createdAt,
            receiverContact: doc.receiverContact,
            receiverName: doc.receiverName,
            rider: doc.rider,
            status: doc.status,
            rate: doc.rate,
            distance: doc.distance,
            dropoffAddress: doc.dropoffAddress,
            dropoffLong: doc.dropoffLong,
            dropoffLat: doc.dropoffLat,
            pickupAddress: doc.pickupAddress,
            pickupLong: doc.pickupLong,
            pickupLat: doc.pickupLat,
            specialInstructions: doc.specialInstructions,
            parcelDesc: doc.parcelDesc,
            parcelWeight: doc.parcelWeight,
            user: doc.user,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/bookings/" + doc._id
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
    User.findById(req.body.userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }
    })
    Rider.findById(req.body.riderId)
    .then(rider => {
      if (!rider) {
        return res.status(404).json({
          message: "Rider not found"
        });
      }
    })
    Status.findById(req.body.statusId)
    .then(status => {
      if (!status) {
        return res.status(404).json({
          message: "Status not found"
        });
      }
    })
    const booking = new Booking({
          _id: new mongoose.Types.ObjectId(),
          user: req.body.userId,
          parcelWeight: req.body.parcelWeight,
          parcelDesc: req.body.parcelDesc,
          specialInstructions: req.body.specialInstructions,
          pickupLat: req.body.pickupLat,
          pickupLong: req.body.pickupLong,
          pickupAddress: req.body.pickupAddress,
          dropoffLat: req.body.dropoffLat,
          dropoffLong: req.body.dropoffLong,
          dropoffAddress: req.body.dropoffAddress,
          distance: req.body.distance,
          rate: req.body.rate,
          status: req.body.statusId,
          rider: req.body.riderId,
          receiverName: req.body.receiverName,
          receiverContact: req.body.receiverContact,
      });
    booking
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /bookings",
        createdBooking: result
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
router.get('/:bookingId', (req, res, next) => {
    const id = req.params.bookingId;
    Booking.findById(id)
    .select("createdAt receiverContact receiverName rider status rate distance dropoffAddress dropoffLong dropoffLat pickupAddress pickupLong pickupLat specialInstructions parcelDesc parcelWeight user _id")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            product: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/booking'
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
router.patch('/:bookingId', (req, res, next) => {
    const id = req.params.bookingId;
    Booking.updateMany({_id: id}, {$set: req.body})
        .exec()
        .then(result => {
        res.status(200).json({
            message: 'Booking updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/bookings/' + id
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
router.delete('/:bookingId', (req, res, next) => {
  const id = req.params.bookingId;
    Booking.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Booking deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:3000/bookings',
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