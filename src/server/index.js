const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const fetch = require('node-fetch');
const app = express();
//console.log(`Your API key is ${process.env.API_KEY}`);


/* Middleware*/
const bodyParser= require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());

app.use(express.static('dist'))


console.log(__dirname)
// API
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = process.env.API_KEY
console.log(apiKey)

let data={}

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})




app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

let k={name: 'k',
       number:2}

app.get('/jj', function (req,res){

    res.send(k);


}  )

app.post('/info', async function (req,res){    
    const request= await fetch(`${baseURL}key=${apiKey}&url=${req.body.url}&lang=en`);
    const response= await request.json();
    console.log(response.sentence_list[0].text)
   data = {
        text: response.sentence_list[0].text ,
        score_tag : response.sentence_list[0].score_tag,
        agreement :  response.sentence_list[0].agreement,
        subjectivity :  response.sentence_list[0].subjectivity,
        confidence :  response.sentence_list[0].confidence,
        irony :  response.sentence_list[0].irony
      }
      console.log(data)
    res.send(data)

})


// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081')
})