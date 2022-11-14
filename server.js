import express from 'express';
import bodyParser from 'body-parser';
import router from './router.js';
import CookieParser from 'cookie-parser'

var app =  express();

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(CookieParser());
app.use("/", router);
// app.use("*", (req, res) => res.status(404).json({error:"page not found"}));



export default app;