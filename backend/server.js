const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./src/config/db');

const userRoute= require('./src/routes/userRoute');
const accountRoute= require('./src/routes/accountRoute');
const incomeRoute= require('./src/routes/incomeRoute');
const expenseRoute = require('./src/routes/expenseRoute');
const transferRoute = require('./src/routes/transferRoute');
const adjustmentRoute = require('./src/routes/adjustmentRoute');

dotenv.config();
connectDB();

const corsOptions = {
    origin: 'http://localhost:3000',  // Your frontend's URL
    credentials: true,  // Allow cookies to be sent
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message
    })
})
app.use("/api/users/", userRoute);
app.use("/api/accounts/", accountRoute);
app.use("/api/incomes/", incomeRoute);
app.use("/api/expenses/", expenseRoute);
app.use("/api/transfers/", transferRoute);
app.use("/api/adjustments/", adjustmentRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on http:localhost:${5000}`)
})

module.exports = app;