const express = require("express"),
    app     = express(),
    request = require("request");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); 

app.get("/", function(req, res){
    
    const url = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json"

    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            res.render("landing", {data});
        };
    });
});

app.listen(3000, function(){
    console.log("Server Running!")
})
