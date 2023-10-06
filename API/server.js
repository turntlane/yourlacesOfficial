const express = require("express");
require('express-async-errors')
const userRoutes = require("./Routes/userRoutes");
const authRoutes = require("./Routes/authRoutes");
const rootRoutes = require("./Routes/root");
const app = express();
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const { logger, logEvents } = require("./Middleware/logger");
const corsOptions = require("./Config/corsOption");
const errorHandler = require("./Middleware/errorHandler");
const cookieParser = require("cookie-parser");
const port = 4000;

console.log(process.env.NODE_ENV)

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

// app.use("/api/v1/users", userRoutes);

app.use('/', rootRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
// app.use('/notes', require('./routes/noteRoutes'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('tsx')) {
        console.log('we are here')
        res.sendFile(path.join(__dirname, '..', 'src', 'Errors', 'page404.tsx'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
