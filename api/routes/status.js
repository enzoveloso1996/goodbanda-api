const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Status = require("../models/status");

//general get
router.get('/', (req, res, next) => {
    Status.find()
    .select("status _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        status: docs.map(doc => {
          return {
            status: doc.status,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/status/" + doc._id
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
    const status = new Status({
        _id: new mongoose.Types.ObjectId(),
        status: req.body.status,
    });
    status
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /status",
        createdStatus: result
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
router.get('/:statusId', (req, res, next) => {
    const id = req.params.statusId;
    Status.findById(id)
    .select('status _id')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            product: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/status'
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
router.patch('/:statusId', (req, res, next) => {
    const id = req.params.statusId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Status.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
        res.status(200).json({
            message: 'Status updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/status/' + id
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
router.delete('/:statusId', (req, res, next) => {
    Status.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Status deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:3000/status',
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