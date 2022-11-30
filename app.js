var express=require('express'),user=require('./routes/user');
var app=express();

app.use(express.json())
app.use('/user',user);


app.listen(3000);