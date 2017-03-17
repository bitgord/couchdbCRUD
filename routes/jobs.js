var express = require('express');
var router = express.Router();
const NodeCouchDb = require('node-couchdb');

const couch = new NodeCouchDb();
var uuid = require('node-uuid');
const uuidV1 = require('uuid/v1');

router.get('/', function(req, res, next) {
  const dbName = "couchdbapp";
  const viewUrl = "_design/alljobs/_view/all";

  const queryOptions = {};

  couch.get(dbName, viewUrl, queryOptions).then(({data, headers, status}) => {
    res.render('jobs', {
      jobs: data.rows
    });
  }, err => {
    res.send('err');
  });
});

router.get('/add', function(req, res, next) {
  res.render('addjob');
});

router.get('/show/:id', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/edit/:id', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/category/:category', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add', function(req, res, next) {
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('category', 'Category is required').notEmpty();
  req.checkBody('city', 'City is required').notEmpty();

  var errors = req.validationErrors();

  if(errors){
    res.render('addjob', {
      errors: errors
    });
  } else {
    couch.insert("couchdbapp", {
      _id: uuid.v1(),
      name: req.body.name,
      category: req.body.category,
	 		website: req.body.website,
	    email: req.body.email,
	    city: req.body.city,
	    country: req.body.country,
    }).then(({data, headers, status}) => {
        req.flash('success', 'Job Added');
        res.redirect('/jobs');
    }, err => {
      res.send(err);
    });
  }

});

router.post('/edit/:id', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/delete/:id', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
