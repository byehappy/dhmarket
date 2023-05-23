require('dotenv').config({path: __dirname+'/./../.env'})

const PORT = process.env.PORT || 8083

const express = require('express'), http = require('http');
const controller = require("../controller/controller");
const app = express();
const server = http.createServer(app);
// const errorMiddleware = require('../middlewares/error-middleware')

const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const passport = require("passport");

app.use(express.json())
app.use(cookieParser())
app.use(
    session({
        secret: "bulldogharlam",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({credentials: true, origin: 'http://localhost:3000',exposedHeaders:['Content-Range', 'X-Content-Range']}))
app.use("/api", controller);
// app.use(errorMiddleware)

const start = async () => {
    try {
        server.listen(PORT, () => console.log('Server listening on port: ', PORT))
    } catch (e) {
        console.log(e)
    }
}

start()

