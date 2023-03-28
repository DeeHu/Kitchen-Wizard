import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts_routes.js'
import { errorHandler } from './routes_controllers/posts_controller.js';

const PORT = process.env.PORT || 5002;
const app = express();
dotenv.config();

app.use(express.json({limit:"30mb", extended:true}));
app.use(express.urlencoded({limit:"30mb", extended:true}));
app.use(cors());
app.use(express.static('build'));
app.use('/api/posts', postRoutes);
app.get('/api', (req,res)=>{
    res.send("Welcome to Dee's cookbook API");
});
app.use(errorHandler);



mongoose
.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology:true})
.then(()=> app.listen(PORT,()=> console.log(`server running on port: ${PORT}`)))
.catch((error)=> console.log(error.message));
mongoose.set('useFindAndModify', false);
