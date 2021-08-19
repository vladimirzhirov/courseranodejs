const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('./cors');

const Favorite = require('../models/favorite');
var User = require('../models/user');
var {Dishes} = require('../models/dishes');

const router = express.Router();

router.use(bodyParser.json());

var authenticate = require('../authenticate');

// favorites
router.route('/')
.get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    const user = req.user;
    const userId = user._id;
    Favorite.find({'user._id': userId})
   .then((favorites) => {
   console.log(favorites);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    const user = req.user;
    const userId = user._id;

    const requestDishes = req.body;

    if (!requestDishes) {
        err = new Error('Check request body');
        err.status = 400;
        return next(err);
    }

    const requestDishesIds = requestDishes.map(x => {
       return x._id.toString();
    });

    Dishes.find().where('_id').in(requestDishesIds).exec((err, dishes) => {
      if (!dishes) {
          res.statusCode = 500;
          res.json({});
          return;
      }

      Favorite.findOne({'user._id': userId}, function(err, fav) {
          if (fav == null) {
              fav = new Favorite({user: user, dishes: dishes});
              fav.save();
          } else {
             var newDishes = [];
             for (var i = 0; i < dishes.length; i ++) {
                 const dishId = dishes[i]._id.toString();
                 if (!fav.dishes.find(x => x._id === dishId)) {
                     newDishes.push(dishes[i]);
                 }
             }
             fav.dishes = fav.dishes.concat(newDishes);
             fav.save();
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(fav);
      });
    });
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    const user = req.user;
    const userId = user._id;
    Favorite.remove({'user._id': userId})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.route('/:dishId')
.get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
   res.statusCode = 404;
   res.end('GET operation not supported on /favorites/:dishId');
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  const user = req.user;
  const userId = user._id;
  const dishId = req.params.dishId;

  Favorite.findOne({'user._id': userId})
  .then((fav) => {
     if (!fav) {
        res.statusCode = 500;
        res.json({});
        return;
     }

     var found = fav.dishes.find(dish => {
         return dish._id.toString() === dishId.toString();
     });

     if (!found) {
         Dishes.findOne({'_id': dishId}).then((dish) => {
            fav.dishes.push(dish);
            fav.save();
         });
     }
     res.statusCode = 200;
     res.setHeader('Content-Type', 'application/json');
     res.json({});
  }, (err) => next(err))
  .catch((err) => next(err));
});

module.exports = router;