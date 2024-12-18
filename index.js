const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

dotenv.config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const corsOptions = {
    origin: ['http://localhost:3000', 'https://blogpost-api-client-c8f6dbdm3-den-almarezs-projects.vercel.app/'],
    credentials: true,
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));


mongoose.connect(process.env.MONGODB_STRING);


let db = mongoose.connection;
db.on("error", console.error.bind(console, "Error in the database connection!"));
db.once("open", ()=> console.log("Now connected to MongoDB Atlas."));



// middlewares
app.use("/users", userRoutes);
app.use("/posts", postRoutes);



if(require.main === module){
	app.listen(process.env.PORT || 3000, ()=> {
		console.log(`API is now running at port ${process.env.PORT || 3000}`);
	})
}


module.exports = {app, mongoose};