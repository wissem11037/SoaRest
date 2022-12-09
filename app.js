require('dotenv').config()
var express=require('express'),user=require('./routes/user');
var app=express();
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use('/user',user);


app.listen(3000);