const express=require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/signup.html');
})

app.post('/', (req,res) => {
    var first = req.body.first;
    var second = req.body.second;
    var password = req.body.pwd;
    
    var data ={
        members : [
            {
                email_address: password,
                status: "subscribed",
                merge_fields: {
                    FNAME: first,
                    LNAME: second
                }

            }
        ]
    };

    var jsonData = JSON.stringify(data);
    const url ="https://us10.api.mailchimp.com/3.0/lists/adc489fa30";

    const options={
        method: "POST",
        auth: "Deepak:d9a011feee1a1bac4a68bb9872c12938-us10"
    }

    const request = https.request(url,options, (response) => {

        if (response.statusCode === 200){
            res.sendFile(__dirname+'/success.html');
        }
        else{
            res.sendFile(__dirname+'/failure.html');
        }

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    })

    // request.write(jsonData);
    request.end();
    
})

app.post('/failure', (req, res) => {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Your app is running on port 3000");
    
})

// d9a011feee1a1bac4a68bb9872c12938-us10
// adc489fa30