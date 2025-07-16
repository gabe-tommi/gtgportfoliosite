import express from 'express';
import mysql from 'mysql2/promise';
import session from 'express-session';
import 'dotenv/config';

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Middleware for parsing POST data
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse JSON bodies

// Session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Middleware for user authentication
function userAuth(req, res, next) {
    if (req.session?.userAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
}

let dataBasePassword = process.env.DB_PASS;
console.log(dataBasePassword);

const pool = mysql.createPool({
    host: "gabedevspace.com",
    user: "gabedevs_portfolio_user", 
    password: dataBasePassword,
    database: "gabedevs_portfolio",
    connectionLimit: 10,
    waitForConnections: true
});

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log("server running port 3000");
})
