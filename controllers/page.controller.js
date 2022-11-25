import loggedIn from "../middleware/loggedIn.js";
import ExpressUserAgent from "express-useragent";
import HighScore from './../models/HighScore.js';
import Sort from './../helpers/sort.js';

export default class PageController{
    static async getGamePage(req, res){
        var source = req.headers['user-agent'];
        var ua = ExpressUserAgent.parse(source);
        var mobile = ua.isMobile
        var x = loggedIn(req, res);
        res.render('VerticalMario',{loggedIn: x, mobile});
    }
    static async getLoginPage(req, res){
        var source = req.headers['user-agent'];
        var ua = ExpressUserAgent.parse(source);
        var mobile = ua.isMobile
        var x = loggedIn(req, res);
        res.render('login', {loggedIn: x, mobile});
    }

    static async getAdminPage(req, res ){
        var source = req.headers['user-agent'];
        var ua = ExpressUserAgent.parse(source);
        var mobile = ua.isMobile
        var x = loggedIn(req, res);
        console.log("getting scores");
        HighScore.find({}).then((scores) => {
            console.log(scores); 
            var sortedScores =  Sort(scores);
            res.render('admin',{loggedIn: x, mobile, sortedScores});
        })

        
    }
    static async getRegistrationPage(req, res){
        var source = req.headers['user-agent'];
        var ua = ExpressUserAgent.parse(source);
        var mobile = ua.isMobile
        var x = loggedIn(req, res);
        res.render('register',  {loggedIn: x, mobile});
    }
}