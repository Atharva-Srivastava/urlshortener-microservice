'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.DB_URI);

app.use(cors());
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.listen(port, function () {
  console.log('Node.js listening ...');
});
//const uri = Enter your mongodb's account connection url here and uncomment this statement;
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true });

var shortschema = new mongoose.Schema({
  original: String,
  short: Number
});

var Short= mongoose.model('Short',shortschema);
var shorturl;
var responseObj= {};

//Regex for url validation
 var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

 app.post('/api/shorturl/new',(req,res)=>{
   var url1 = req.body.url;
   if(!regex.test(url1)){
     responseObj['error']='invalid url';
     res.json(responseObj);
   }else{
   Short.find({'original': url1},function(err, foundurl){
     if(err) return console.log(err);
     if(Array.isArray(foundurl) && foundurl.length){
     responseObj['original_url'] = foundurl[0].original;
     responseObj['short_url'] = foundurl[0].short;
     res.send(responseObj); 
     }else{
      Short.find({}).sort({short:-1}).limit(1).exec(function(err,document){
       shorturl= document[0].short + 1;
        var newshort= new Short({original: url1, short: shorturl});
        newshort.save(function(err, data) {
        if (err) return console.error(err);
        responseObj['original_url']= data.original;
        responseObj['short_url']= data.short;
        res.json(responseObj); 
          });
       })
     }
   })
   }
 })
 app.get('/api/shorturl/:url1',(req,res)=>{
   let url2 = req.params.url1;
   Short.find({short: url2}, function(err, shortdoc){
        if(err) return console.log(err);
        if(Array.isArray(shortdoc) && shortdoc.length){
        var original1= shortdoc[0].original;
          res.redirect(original1);
        }else{
          res.send('Error:404, Url not found in the database');
    }
   })
 })