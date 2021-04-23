const express = require("express");
const router= express.Router(); 
const College = require("../models/model_college");

router.get("/getbyid/:id",function(req,res){

  College.findById(req.params.id,function(err,foundCollege){
    if(err)
    {
        console.log(err);
    }
    else{
        res.json(foundCollege);
    }
  })
})

router.get("/getbyname/:name",function(req,res){
  var query = { name : req.params.name}
  College.find(query,function(err,foundCollege){
    if(err)
    {
        console.log(err);
    }
    else{

        res.json(foundCollege);
    }
  })
})

router.get("/getsimilarColleges/:college_id",function(req,res){
  College.findById(req.params.college_id,function(err,foundCollege){
    if(err)
    {
        console.log(err);
    }
    else{
        var s = foundCollege.courses;
        var query = { $or:[
          {city:foundCollege.city},
          {state:foundCollege.state}
        ],courses : {$in:foundCollege.courses}, _id : {$ne:foundCollege._id}};
        College.find(query,function(err,similarCollege){
          if(err)
          {
              console.log(err);
          }
          else{
              if(similarCollege.length===0)
              {
                res.send("No similar College found");
              }
              else
              {
                res.json(similarCollege);
              }
          }
        })
    }
  })
})

router.get("/getbystate/:state",function(req,res){
  var query = { state : req.params.state}
  College.find(query,function(err,foundCollege){
    if(err)
    {
        console.log(err);
    }
    else{

        res.json(foundCollege);
    }
  })
})

router.get("/getbycourse/:course",function(req,res){
  var query = { courses : {$in: req.params.course}}
  College.find(query,function(err,foundCollege){
    if(err)
    {
        console.log(err);
    }
    else{

        res.json(foundCollege);
    }
  })
})


router.get("/getstates",function(req,res){
  College.distinct('state',function(err,foundCollege){
    if(err)
    {
        console.log(err);
    }
    else{

        res.json(foundCollege);
    }
  })
})

router.get('/getcountbystates',(req,res)=>{
  
  College.find({},(err,listOfColleges)=>{
      if(err){
          console.log(err);
      }
      else{
          statemap={};
          for(var i=0;i<listOfColleges.length;i++){
              if(statemap.hasOwnProperty(listOfColleges[i].state)){
                  statemap[listOfColleges[i].state]++;
              }
              else{
                  statemap[listOfColleges[i].state] = 1;
              }
          }
          res.json(statemap)
      }
  })

})

router.get('/getcountbycourses',(req,res)=>{
  
  College.find({},(err,listOfColleges)=>{
      if(err){
          console.log(err);
      }
      else{
          coursemap={};
          for(var i=0;i<listOfColleges.length;i++){
              for(var j=0;j<listOfColleges[i].courses.length;j++)
              {
                if(coursemap.hasOwnProperty(listOfColleges[i].courses[j])){
                  coursemap[listOfColleges[i].courses[j]]++;
              }
              else{
                  coursemap[listOfColleges[i].courses[j]] = 1;
              }
              }
              
          }
          res.json(coursemap)
      }
  })

})

 
module.exports=router;