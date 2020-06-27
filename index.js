const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/anshgamers', {useNewUrlParser: true , useUnifiedTopology: true});
const bodyParser = require('body-parser');

// MONGOOSE SPECIFIC STUFF
// Schema
const contactSchema = new mongoose.Schema({
    email: String,
    password: String
});

const Contact = mongoose.model('Contact', contactSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/contact', (req,res)=> {
    var myData = new Contact(req.body);
    myData.save().then(()=> {
        res.send("Data Saved to database");
    }).catch(() => {
        res.status(400).send("Item not saved to database")
    })
});

// EXPRESS SPECIFIC STUFF
app.use(express.static('public'));
// app.use(function (req, res, next) {
//     res.status(404).send("Sorry can't find that!")
// })

// LISINING STUFF
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))