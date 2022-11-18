import loggedIn from "../middleware/loggedIn.js";
import ExpressUserAgent from "express-useragent";

export default class PageController{
    static async getGamePage(req, res){
        var source = req.headers['user-agent'];
        var ua = ExpressUserAgent.parse(source);
        var mobile = ua.isMobile
        var x = loggedIn(req, res);
        res.render('VerticalMario',{loggedIn: x, mobile});
    }
    static async getLoginPage(req, res){
        var x = loggedIn(req, res);
        res.render('login', {loggedIn: x});
    }

    static async getAdminPage(req, res ){
        var x = loggedIn(req, res);
        res.render('admin',{loggedIn: x});
    }
    static async getRegistrationPage(req, res){
        var x = loggedIn(req, res);
        res.render('register',  {loggedIn: x});
    }
}