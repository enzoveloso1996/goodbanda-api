const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/user");

//general get
router.get('/', (req, res, next) => {
    User.find()
    .select("loadBalance currentLong currentLat email contactNumber password userName lastName middleName firstName _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            loadBalance: doc.loadBalance,
            currentLong: doc.currentLong,
            currentLat: doc.currentLat,
            email: doc.email,
            contactNumber: doc.contactNumber,
            password: doc.password,
            userName: doc.userName,
            lastName: doc.lastName,
            middleName: doc.middleName,
            firstName: doc.firstName,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/users/" + doc._id
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
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password,
        contactNumber: req.body.contactNumber,
        email: req.body.email,
        currentLat: req.body.currentLat,
        currentLong: req.body.currentLong,
        loadBalance: req.body.loadBalance,
    });
    user
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /users",
        createdUser: result
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
router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
    .select("loadBalance currentLong currentLat email contactNumber password userName lastName middleName firstName _id")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            product: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/users'
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
router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    User.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
        res.status(200).json({
            message: 'User updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/users/' + id
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
router.delete('/:userId', (req, res, next) => {
    User.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'User deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:3000/users',
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