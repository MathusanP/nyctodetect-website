const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.set('strictQuery', false);

require('dotenv').config();
mongoose.connect(process.env['url'], { useNewUrlParser: true });


const resultSchema = {
    title: String,
    content: String,
}

const results = mongoose.model("Results", resultSchema);

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile('index.html', { root: __dirname });
}) 

app.post("/", function(req, res) {
    let newResult = new results ({
        title: req.body.survey,
        content: req.body.question_1
    });
    newResult.save();
    console.log('Saved')
})


app.listen(3000, function(){
    console.log("Server is on.");
})
