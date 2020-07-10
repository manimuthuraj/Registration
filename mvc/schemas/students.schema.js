var mongoose = require("mongoose")

var stdSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: String, required: true }
})

module.exports = mongoose.model("std", stdSchema)