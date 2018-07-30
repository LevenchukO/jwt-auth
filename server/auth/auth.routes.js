var express = require('express');
var router = express.Router();
var User = require('./user.model');
var jwt = require('jsonwebtoken');
var location = require('./location.model')
var nodemailer = require('nodemailer');

var decodedtoken = '';

router.post('/register', function (req, res, next) {
  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    country: req.body.country,
    city: req.body.city,
    zipcode: req.body.zipcode,
    creation_dt: Date.now()
  })

  let promise = user.save();

  promise.then(function (doc) {
    return res.status(201).json(doc);
  })

  promise.catch(function (err) {
    return res.status(501).json({message: `Error registration user.`})
  })
})

router.post('/login', function (req, res, next) {
  let promise = User.findOne({email: req.body.email}).exec();

  promise.then(function (doc) {
    if (doc) {
      if (doc.isValid(req.body.password)) {
        let token = jwt.sign({email: doc.email}, `secret key`, {expiresIn: `4h`});
        return res.status(200).json(token);
      } else {
        return res.status(501).json({message: `Invalid password.`})
      }
    } else {
      return res.status(501).json({message: `User email is not registered.`})
    }
  })
})

router.get(`/userdata`, verifyToken, function (req, res, next) {
  let promise = User.findOne({email: decodedtoken.email}).exec();

  promise.then(item => {
    return res.status(200).json(item);
  })
})

router.get(`/getcountries`, function (req, res, next) {
  location.Country.find({}, function (err, doc) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);
  })
})

router.get(`/cities/:countryID`, function (req, res, next) {
  location.City.find({countryID: req.params.countryID}, function (err, doc) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);
  })
})

router.get(`/zipcodes/:cityID`, function (req, res, next) {
  location.Zipcode.find({cityID: req.params.cityID}, function (err, doc) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);
  })
})

router.post('/recovery-request', function (req, res, next) {
  let token = jwt.sign({email: req.body.email}, `recovery key`, {expiresIn: `4h`});
  const output = `
    <h3>To recover the password, click on the link:</h3>
    http://localhost:4200/auth/pass-reset/${token}
  `;

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: '2000gramm@gmail.com',
        pass: '9884258peleador'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    let mailOptions = {
      from: '"2000gramm" <2000gramm@gmail.com>',
      to: 'levenchuk.o@gmail.com',
      subject: 'Recovery password',
      html: output
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      res.status(200).json({"text":"SEND SUCCESS => check your email"});
    });
  });

router.get('/recovery-pass/:token', function (req, res, next) {

})

function verifyToken(req, res, next) {
  let token = req.query.token;
  jwt.verify(token, 'secret key', function (err, tokendata) {
    if (err) {
      return res.status(400).json({message: 'Unauthorized request'});
    }
    if (tokendata) {
      decodedtoken = tokendata;
      next();
    }
  })
}


module.exports = router;
