var mongo = require('mongodb');

//connect to database
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://myadmin:myadmin@ds231070.mlab.com:31070/";

exports.findOriginalFromShortUrl = function(query,callback){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("url-shortner");
        dbo.collection("url").find(query).toArray(function(err, result) {
          if (err) throw err;
          if(result.length == 0){
              callback("/");
          }else{
            callback(result[0].original);
          }
          db.close();
        });
      }); 
}

exports.findShortFromOriginalUrl = function(query,callback){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("url-shortner");
        dbo.collection("url").find(query).toArray(function(err, result) {
          if (err) throw err;
          if(result.length == 0){
              callback(false);
          }else{
            callback(result[0].short);
          }
          db.close();
        });
      }); 
}
exports.insertUrl = function(query,callback){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("url-shortner");
        //var myobj = { name: "Company Inc", address: "Highway 37" };
        dbo.collection("url").insertOne(query, function(err, res) {
          if (err) throw err;
          callback(true);
          db.close();
        });
      });
}
