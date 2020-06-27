const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Rate = require("../models/rate");

//general get
router.get('/', (req, res, next) => {
    Rate.find()
    .select("rate km _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            rate: doc.rate,
            km: doc.km,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/rates/" + doc._id
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
    const rate = new Rate({
        _id: new mongoose.Types.ObjectId(),
        km: req.body.km,
        rate: req.body.rate
    });
    rate
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /rates",
        createdRates: result
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
router.get('/:rateId', (req, res, next) => {
    const id = req.params.rateId;
    Rate.findById(id)
    .select('rate km _id')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            product: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/rates'
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
router.patch('/:rateId', (req, res, next) => {
    const id = req.params.rateId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Rate.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
        res.status(200).json({
            message: 'Rate updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/rates/' + id
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
router.delete('/:rateId', (req, res, next) => {
    Rate.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Rate deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:3000/rates',
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