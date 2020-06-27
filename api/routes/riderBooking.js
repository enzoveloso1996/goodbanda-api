const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const RiderBooking = require("../models/riderBooking");

//general get
router.get('/', (req, res, next) => {
    RiderBooking.find()
    .select("receiverContact receiverName statusId distance dropoffAddress pickupAddress parcelDesc parcelWeight userId riderId _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            receiverContact: doc.receiverContact,
            receiverName: doc.receiverName,
            statusId: doc.statusId,
            distance: doc.distance,
            dropoffAddress: doc.dropoffAddress,
            pickupAddress: doc.pickupAddress,
            parcelDesc: doc.parcelDesc,
            parcelWeight: doc.parcelWeight,
            userId: doc.userId,
            riderId: doc.riderId,
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
    const riderBooking = new RiderBooking({
        _id: new mongoose.Types.ObjectId(),
        riderId: req.body.riderId,
        userId: req.body.userId,
        parcelWeight: req.body.parcelWeight,
        parcelDesc: req.body.parcelDesc,
        pickupAddress: req.body.pickupAddress,
        dropoffAddress: req.body.dropoffAddress,
        distance: req.body.distance,
        statusId: req.body.statusId,
        receiverName: req.body.receiverName,
        receiverContact: req.body.receiverContact,
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
    .select("receiverContact receiverName statusId distance dropoffAddress pickupAddress parcelDesc parcelWeight userId riderId _id")
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
    RiderBooking.update({ _id: id }, { $set: updateOps })
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