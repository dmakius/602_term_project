import express from "express";
import scoreController from "./controllers/score.controller.js";
import userController from "./controllers/user.controller.js";
import auth from "./middleware/auth.js";
import loggedIn from "./middleware/loggedIn.js";
import ExpressUserAgent from "express-useragent";
const router = express.Router();

router.get('/', async function (req, res) {
    var source = req.headers['user-agent']
    var ua = ExpressUserAgent.parse(source);
    var isMobile = ua.isMobile

    var x = loggedIn(req, res);
    console.log(x);
    res.render('VerticalMario',{loggedIn: x, mobile: isMobile});
});

router.get('/admin', auth, function(req, res){
    var x = loggedIn(req, res);
    console.log(x);
    res.render('admin',{loggedIn: x});
});

router.get('/login', async function(req, res){
    var x = loggedIn(req, res);
    console.log(x);
    res.render('login', {loggedIn: x});
});

router.get('/register', async function(req, res){
    var x = loggedIn(req, res);
    console.log(x);
    res.render('register',  {loggedIn: x});
});

router.get('/logout', userController.logout);
router.post('/User/Create',userController.register);
router.post('/User/Login',userController.login);
router.post('/UpdateScore',scoreController.updateScore);
router.post('/DeleteScore', scoreController.deleteScore);
router.get('/GetScores',scoreController.getScores);
router.post('/highscore',scoreController.createScore);


export default router;