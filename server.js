const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.set('strictQuery', false);
/*
require('dotenv').config();
mongoose.connect(process.env['url'], { useNewUrlParser: true });
*/
mongoose.connect('mongodb+srv://nyctodetect:nyctophobia365@nyctosurvey.kqpot9l.mongodb.net/test78164751', { useNewUrlParser: true });


const resultSchema = {
    title: String,
    has_phobia: String,
    image_1: String,
    image_2: String,
    image_3: String,
    image_4: String,
    image_5: String,
}

const results = mongoose.model("Results", resultSchema);

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile('index.html', { root: __dirname });
}) 

app.post("/", function(req, res) {
    let newResult = new results ({
        title: req.body.survey,
        has_phobia: req.body.has_phobia,
        image_1: req.body.image_1,
        image_2: req.body.image_2,
        image_3: req.body.image_3,
        image_4: req.body.image_4,
        image_5: req.body.image_5
    });
    newResult.save();
    console.log('Saved')
})


app.listen(3000, function(){
    console.log("Server is on.");
})
