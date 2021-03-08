const { response, request } = require('express');
const express = require ('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const app = express();
const port = 2000;
const url = 'mongodb://localhost/27017';

app.use(cors());
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
app.use(express.json());

app.get('/',(req,res) =>{
    console.log("Received request:",req);
    res.status(200).send('Hello World');
})

app.post('/login',(req,res)=>{
    console.log("Entered login api");
    console.log("Request: ",req.body); 
    MongoClient.connect(url,{useUnifiedTopology:true},function(err, db) {
                if (err) throw err;
                var dbo = db.db("vehicle_mgmt_system");
                dbo.collection("login").find(req.body).toArray(function (err,data){
                    if (err) throw err;
                        res.status(200).send(data);
                    db.close();
        })
    });
});

app.post('/signup',(req,res)=>{
    console.log("Entered Signup api");
    console.log("Request: ",req.body);
    MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("vehicle_mgmt_system");
                dbo.collection("login").insertOne(req.body);
                res.send("document inserted")
         db.close();
    });
});


app.listen((port),()=>{
    console.log("Server is listening to the port",port);
})
