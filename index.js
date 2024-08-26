const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
require('dotenv').config();

const userRoutes = require("./routes/user");
const movieRoutes = require("./routes/movie");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: ['http://localhost:4000'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

app.use("/users", userRoutes);
app.use("/movies", movieRoutes); 

if (require.main === module) {

    app.listen(process.env.PORT || 4000, () => {
        console.log(`API is now online on port ${process.env.PORT || 3000}`);
    });
}

module.exports = { app, mongoose };