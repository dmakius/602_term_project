import HighScore from './../models/HighScore.js';
import mongoose from 'mongoose';

export default class ScoreController{
    static async getScores(req, res){
        var results = null;
        HighScore.find({})
        .then((data) => { 
            results = data;
            res.send(results)
            });
    }

    static async createScore(req, res){
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
    
        res.send("hi score saved!!!!!");
    
    }

    static async deleteScore(req, res){
        console.log("deleteing Score");
        console.log(req.body);
        HighScore.deleteOne({_id:req.body.id}).then(
            (data) =>{
                console.log(data);
                res.send({status:200, id:req.body.id});
            }
        );
    }

    static async updateScore(req, res){
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
    }
}
    