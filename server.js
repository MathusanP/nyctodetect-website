const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.set('strictQuery', false);

// Connecting to the database, the url is a secret, so we use a env variable which we'll assign the value to the hosting site.

require('dotenv').config();
mongoose.connect(process.env['url_2'], { useNewUrlParser: true });


// Our schema structures our data
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

// Express server pushes the index.html file to the user
app.get("/", function(req, res) {
    res.sendFile('index.html', { root: __dirname });
}) 

// Sending the user input to the mongodb database
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

// We use an express server to keep this script alive, routed to port 3000. 
app.listen(3000, function(){
    console.log("Server is on.");
})
