const express = require("express"); 
const app = express();
const mongoose = require("mongoose");
const db = "mongodb+srv://deepak:1234@cluster0.7f3dc.mongodb.net/OneshotAI?retryWrites=true&w=majority"
const college_route = require("./routes/route_college");
const student_route = require("./routes/route_student");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({     extended: false  })); 
app.use(bodyParser.json());

app.get('/',(req,res) =>{
    res.send("hello from server");
})
app.use('/college',college_route);
app.use('/student',student_route);

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