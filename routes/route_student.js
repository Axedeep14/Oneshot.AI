const express = require("express");
const router= express.Router(); 
const Student = require("../models/model_student");


router.get("/getbyid/:student_id",function(req,res){

    Student.findById(req.params.student_id,function(err,foundStudent){
      if(err)
      {
          console.log(err);
      }
      else{
          res.json(foundStudent);
      }
    })
  })

router.get("/getbycollegeid/:college_id",function(req,res){
    var query = { college_id : req.params.college_id}
    Student.find(query,function(err,foundStudent){
      if(err)
      {
          console.log(err);
      }
      else{
  
          res.json(foundStudent);
      }
    })
  })

  module.exports=router;