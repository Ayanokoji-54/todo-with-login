const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const JWT_SECRET = "DEEPAK12FRESGH"
app.use(express.json())
const path = require("path"); //for path join

app.use('/sign',express.static(path.join(__dirname, "../signfrontend")));
app.use('/dashboard',express.static(path.join(__dirname, "../frontend1")));
let users = []

app.get('/' ,function(req ,res){
    res.sendFile(path.join(__dirname , "../signfrontend/sign.html"))
})
app.post('/signup' , function(req,res){
    const {username , mobileno ,password} = req.body
    
    const userexists = users.find( u => u.username === username);
  
    if(userexists) {
        return res.status(400).json({ message: "User already exists" });
    }

    users.push({ username, mobileno ,password });
    res.json({ message: "You are signed up" });
    console.log(users);
})

app.post('/signin' , function(req,res){
    const {username ,mobileno, password} = req.body

    const user = users.find(u => u.username === username && u.password === password && u.mobileno === mobileno);
    if (user) {
        const token = jwt.sign({username },JWT_SECRET)
        res.json({ token: token });
    } else {
        res.status(403).json({ message: "Invalid username or password" });
    }
    console.log(users);
})

function authenticate(req ,res, next){
    const token = req.headers["token"]
    const decodejwt = jwt.verify(token, JWT_SECRET)

    if(decodejwt.username && decodejwt.password){
        req.username = decodejwt.username
        req.password = decodejwt.password
        next()
    }else{
        res.json({
            message : "u are not elligible"
        })
    }

}
app.get('/me',authenticate,function(req,res){
    const user = users.find(u => u.username == req.username && u.password == req.password)
    if(user){
        res.sendFile(path.join(__dirname ,"../frontend1/index.html"));
    }
})
app.listen(3000,() => console.log("server running"))