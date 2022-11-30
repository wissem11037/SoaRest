const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    getUsername() {
        return this.username;
    }
    getPassword() {
        return this.password;
    }
    setUsername(username) {
        this.username = username;
    }
    setPassword(password) {
        this.password = password;
    }
}

users = [];

function findUser(name) {
    if (this.users.find(user => user.getUsername() === name)) {
        return true;
    } else return false;
}

async function Compare(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

router.post('/signup', async function(req, res, next) {
    try {
        let {  username, password  } = req.body;
          
        if (!findUser(username)) {
            hashed_password = await bcrypt.hash(password,10);
            this.users.push(new User(username, hashed_password));
            console.log(hashed_password);
            console.log("User Created");
            let token = jwt.sign({ data: username  }, 'secret');
               
          
            res.status(200).json({message:"Crée avec succés ", token:token}); 
                 
        } else {
            res.status(403).json({message:"User already Exists!! "}); 
        }     
               
           
        
    } catch (error) { 
        res.status(404).json({message:error});
    }
});

router.post('/signin', async function(req, res, next) {
    try {
        let {username,password} = req.body;
            
            
        if (findUser(username)) {
            const userInList = this.users.find(user => user.getUsername() === username);
            const hashed_password =  await bcrypt.hash(password,10);

            if (Compare(userInList.getPassword(), hashed_password)) {
                let token = jwt.sign({  data: username  }, 'secret');
                res.status(200).json({message:"Logged in! ",data: username, token:token});
            } 
            else {
                res.status(403).json({message:"incorrect Username or Password!!"}); 
            }
        } 
        else {
           res.status(404).json({message:"user not found"}); 
        }
    } 
    catch (error) { 
        res.status(404).json({message:error});
    }
});
router.get('/usersList', async function(req, res, next) {
    try {
        
        res.status(200).json(this.users);   
    } 
    catch (error) { 
        res.status(404).json({message:error}); 
    }
});

module.exports = router;