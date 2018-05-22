var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var mongo = require('mongodb');
var mongo_model = require('./urlModel');

//connect to database
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://plushubham:$Hubh_09@ds231070.mlab.com:31070/";



//homepage
app.use(express.static('public'));
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

//if user hit short_url
app.get('/:short_url',(req,res)=>{
  var short_url = req.params.short_url;
  mongo_model.findOriginalFromShortUrl({short:short_url},function(result){
    res.status(301).redirect("https://"+result);
  })
})

//if user hit original url
app.get('/new/:url',(request,response)=>{
     var original_url = request.params.url;
    mongo_model.findShortFromOriginalUrl({original:original_url},function(result){
      if(result == false){
        var random_number = Math.floor((Math.random() * 10000) + 1);
        var query = {original:original_url,short:random_number.toString()}
        mongo_model.insertUrl(query,function(feedback){
          if(feedback){
            var output_json={
              "original_url":original_url,
              "short_url":"localhost:3000/" + random_number.toString()
            }
            response.end(JSON.stringify(output_json));  
          }
          else{
              response.send("something went wrong");
          }
        })
      }
      else{
        var output_json={
          "original_url":original_url,
          "short_url":"localhost:3000/" + result
        }
        response.end(JSON.stringify(output_json));  
      }
    })
  })
app.listen(port);