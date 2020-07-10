const std = require('../schemas/students.schema');

exports.getList = ()=>{
  return std.find({})
}