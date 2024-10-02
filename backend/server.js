const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./src/config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on http:localhost:${5000}`)
})

module.exports = app;