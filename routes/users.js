var express = require('express');
var router = express.Router();
// var path = require('path');
var mongoose = require('mongoose');

//Mongoose configuration
mongoose.connect('mongodb://localhost/users');

// Models
var User = mongoose.model('User', {
  name: String,
  role: String,
  company: String
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.sendFile(path.join(__dirname, '../public/javascripts/users.json'));

  console.log("fetching users");

  // use mongoose to get all users in the database
  User.find(function(err, users) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
        res.send(err)

    res.json(users); // return all users in JSON format
  });
});

router.post('/', function(req, res) {

  console.log("creating user");

  // create a user, information comes from request from Ionic
  User.create({
      name : req.body.name,
      role : req.body.role,
      company: req.body.company,
      done : false
  }, function(err, user) {
      if (err)
          res.send(err);

      // get and return all the users after you create another
      User.find(function(err, users) {
          if (err)
              res.send(err)
          res.json(users);
      });
  });

});

// delete a user
router.delete('/:user_id', function(req, res) {
  User.remove({
      _id : req.params.user_id
  }, function(err, user) {
    if (err)
      res.send(err)
    res.json(users);
  });
});

module.exports = router;
