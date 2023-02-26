//create login page

const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// initializing express
const app = express();

// Connecting Database
mongoose.connect('mongodb://localhost:27017/jwtdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'));

//Middlewares
app.use(bodyParser.json());
app.use(cors());

//Routes
app.post('/login', (req, res) => {
    const user = {
        id: 1,
        username: 'admin',
        password: 'admin',
    }

    jwt.sign({ user }, 'secretkey', (err, token) => {
        if (err) {
            res.json({
                message: 'Error Occured!'
            })
        }
        else {
            if (req.body.username === user.username && req.body.password === user.password) {
                res.json({
                    token
                })
            }
            else {
                res.json({
                    message: 'Invalid Credentials'
                })
            }
        }
    })
})

//listen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));


//create homepage
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// initializing express
const app = express();

// Connecting Database
mongoose.connect('mongodb://localhost:27017/jwtdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'));

//Middlewares
app.use(bodyParser.json());
app.use(cors());

// Protected Route
app.get('/home', verifyToken, (req, res) => {
    res.json({
        message: 'Welcome to Home Page'
    })
})

// Token Verification
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else {
        res.status(403).json({
            message: 'Authentication Failed'
        })
    }
}

//listen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));


//create register page
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// initializing express
const app = express();

// Connecting Database
mongoose.connect('mongodb://localhost:27017/jwtdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'));

//Middlewares
app.use(bodyParser.json());
app.use(cors());

//Routes
app.post('/register', (req, res) => {

    const user = {
        id: 1,
        username: req.body.username,
        password: req.body.password,
    }

    jwt.sign({ user }, 'secretkey', (err, token) => {
        if (err) {
            res.json({
                message: 'Error Occured!'
            })
        }
        else {
            res.json({
                token
            })
        }
    })
})

//listen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));
