const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const RiderBooking = require("../models/riderBooking");

//general get
router.get('/', (req, res, next) => {
    RiderBooking.find()
    .select("createdAt gemEarned receiverContact receiverName statusId deduction earned rate distance dropoffAddress pickupAddress parcelDesc parcelWeight userId riderId riderBookingId")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            createdAt: doc.createdAt,
            gemEarned: doc.gemEarned,
            receiverContact: doc.receiverContact,
            receiverName: doc.receiverName,
            statusId: doc.statusId,
            deduction: doc.deduction,
            earned: doc.earned,
            rate: doc.rate,
            distance: doc.distance,
            dropoffAddress: doc.dropoffAddress,
            pickupAddress: doc.pickupAddress,
            parcelDesc: doc.parcelDesc,
            parcelWeight: doc.parcelWeight,
            userId: doc.userId,
            riderId: doc.riderId,
            riderBookingId: doc.riderBookingId,
            request: {
              type: "GET",
              url: "http://localhost:3000/riderBooking/" + doc.riderBookingId
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
    const riderBooking = new RiderBooking({
        riderBookingId: new mongoose.Types.ObjectId(),
        riderId: req.body.riderId,
        userId: req.body.userId,
        parcelWeight: req.body.parcelWeight,
        parcelDesc: req.body.parcelDesc,
        pickupAddress: req.body.pickupAddress,
        dropoffAddress: req.body.dropoffAddress,
        distance: req.body.distance,
        rate: req.body.rate,
        earned: req.body.earned,
        deduction: req.body.deduction,
        statusId: req.body.statusId,
        receiverName: req.body.receiverName,
        receiverContact: req.body.receiverContact,
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
    .select("createdAt gemEarned receiverContact receiverName statusId deduction earned rate distance dropoffAddress pickupAddress parcelDesc parcelWeight userId riderId riderBookingId")
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
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    RiderBooking.update({ riderBookingId: id }, { $set: updateOps })
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
    RiderBooking.remove({ riderBookingId: id })
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