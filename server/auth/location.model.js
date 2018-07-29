var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var countrySchema = new Schema({
  country: String
});
var citySchema = new Schema({
  countryID: String,
  city: String
});
var zipcodeSchema = new Schema({
  countryID: String,
  cityID: String,
  zipcode: String
});

exports.Country = mongoose.model('Country',countrySchema);
exports.City = mongoose.model('City',citySchema);
exports.Zipcode = mongoose.model('Zipcode',zipcodeSchema);
