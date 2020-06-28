const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Booking = require("../models/booking");

//general get
router.get('/', (req, res, next) => {
    Booking.find()
    .select("createdAt receiverContact receiverName riderId statusId rate distance dropoffAddress dropoffLong dropoffLat pickupAddress pickupLong pickupLat specialInstructions parcelDesc parcelWeight userId _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        bookings: docs.map(doc => {
          return {
            createdAt: doc.createdAt,
            receiverContact: doc.receiverContact,
            receiverName: doc.receiverName,
            riderId: doc.riderId,
            statusId: doc.statusId,
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
            userId: doc.userId,
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
    const booking = new Booking({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
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
        statusId: req.body.statusId,
        riderId: req.body.riderId,
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
    .select("createdAt receiverContact receiverName riderId statusId rate distance dropoffAddress dropoffLong dropoffLat pickupAddress pickupLong pickupLat specialInstructions parcelDesc parcelWeight userId _id")
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