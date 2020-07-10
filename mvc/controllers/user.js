const express = require('express');
const userModel = require('../models/user');
const router = express.Router();

router.get('/',(req,res)=>{
  res.json({
    status: 200,
    data:{
      message:'hellow world'
    }
  })
})

router.get('/getUser',async (req,res)=>{
  let list = await userModel.getList()
  res.json({
    status: 200,
    data:{
      message:[1,2,4],
      list
    }
  })
})

module.exports = router;