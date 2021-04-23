const express = require("express"); 
const app = express();
const mongoose = require("mongoose");
const db = "mongodb+srv://deepak:1234@cluster0.7f3dc.mongodb.net/OneshotAI?retryWrites=true&w=majority"
const college_route = require("./routes/route_college");
const student_route = require("./routes/route_student");
const bodyParser = require("body-parser");
const path = require('path');

app.use(bodyParser.urlencoded({     extended: false  })); 
app.use(bodyParser.json());

app.use('/college',college_route);
app.use('/student',student_route);


app.use(express.static(path.join(__dirname,  'frontend','build')));
app.get("*", (req, res) => {
          res.sendFile(path.join(__dirname,  'frontend','build','index.html'));
});

mongoose.Promise=global.Promise;

mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err){
        console.log(err)
    }
    else
    console.log("connected to db")
})

app.listen(process.env.PORT||5000, () => {
  console.log("Server is listening on port: 5000");
});