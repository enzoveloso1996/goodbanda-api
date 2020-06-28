const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Rider = require("../models/rider");

//general get
router.get('/', (req, res, next) => {
    Rider.find()
    .select("createdAt gems contactNumber loadBalance currentLong currentLat isAvailable address email password lastName middleName firstName _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        riders: docs.map(doc => {
          return {
            createdAt: doc.createdAt,
            gems: doc.gems,
            contactNumber: doc.contactNumber,
            loadBalance: doc.loadBalance,
            currentLong: doc.currentLong,
            currentLat: doc.currentLat,
            isAvailable: doc.isAvailable,
            email: doc.email,
            address: doc.address,
            password: doc.password,
            lastName: doc.lastName,
            middleName: doc.middleName,
            firstName: doc.firstName,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/riders/" + doc._id
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
    const rider = new Rider({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email,
        address: req.body.address,
        isAvailable: req.body.isAvailable,
        currentLat: req.body.currentLat,
        currentLong: req.body.currentLong,
        loadBalance: req.body.loadBalance,
        contactNumber: req.body.contactNumber,
        gems: req.body.gems,
    });
    rider
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /riders",
        createdRider: result
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
router.get('/:riderId', (req, res, next) => {
    const id = req.params.riderId;
    Rider.findById(id)
    .select("createdAt gems contactNumber loadBalance currentLong currentLat isAvailable address email password lastName middleName firstName _id")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            product: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/riders'
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
router.patch('/:riderId', (req, res, next) => {
    const id = req.params.riderId;
    Rider.updateMany({_id: id}, {$set: req.body})
        .exec()
        .then(result => {
        res.status(200).json({
            message: 'Rider updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/riders/' + id
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
router.delete('/:riderId', (req, res, next) => {
  const id = req.params.riderId;
    Rider.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Rider deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:3000/riders',
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