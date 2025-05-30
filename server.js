const express = require("express");
const app = express();
const mongodb = require("./data/database")
const bodyParser = require("body-parser");

const port =process.env.PORT || 3003;

app.use(bodyParser.json());

app.use('/', require('./routes/index'));


mongodb.initdb((err)=>{
    if(err){
        console.log(err)
    }
    else{
        app.listen(port, () => {
            console.log('Database is listening at port ' + (port));
          });
    }
})