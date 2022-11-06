import express from 'express';
import path from 'path';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import HighScore from './HighScore.js';
import dotenv  from "dotenv";

var app =  express();
const __dirname = path.resolve();

dotenv.config();

const mongoString = `mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.kixmdnb.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(mongoString,  {
    useNewUrlParser: true
  });

mongoose.connection.on("error", function(error) {
  console.log(error);
});

mongoose.connection.on("open", function() {
    console.log("Connected to MongoDB database.")

});

app.set('view engine', 'jade');

app.use('/public', express.static('public'));
// app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function (req, res) {
    res.sendFile(__dirname+'/VerticalMario.html');
});

app.get('/admin', function(req, res){
    res.sendFile(__dirname + '/admin.html');
});

app.post('/UpdateScore', function(req, res){
    console.log('updating score:' + req);
    console.log(req.body.username);
    console.log(req.body.score);
    HighScore.updateOne({_id:req.body.id},
        {$set:{name:req.body.username, score: req.body.score}}).then(
            (data)=>{
                console.log(data);
            }
        );
    res.send("updated sucesfull");
});

app.post('/DeleteScore', function(req, res){
    console.log("deleteing Score");
    console.log(req.body);
    HighScore.deleteOne({_id:req.body.id}).then(
        (data) =>{
            console.log(data);
            res.send({status:200, id:req.body.id});
        }
    );
});

app.get('/GetScores', function(req, res){     
    var results = null;
    HighScore.find({}).then(
        (data) => { 
            results = data;
            res.send(results)
        });
     
});

app.post('/highscore',function (req, res){
    console.log("saving score");
    console.log((req.body.name));
    

    const hs = new HighScore({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        score: 1000
    });

    hs.save(function(err,result){
        if (err){
            console.log(err);
        }
        else{
            console.log(result)
      
        }
    });

    // HighScores.findOne({}, function (err, docs) {
    //     if (err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log("Found: ", docs);
    //     }
    // });
    
    res.send("hi score saved!!!!!");

} )

app.listen(5000);
