import express from 'express';
import mongoose from 'mongoose'
import router from './routes/UserRoutes';
import blogRouter from './routes/BlogRoutes';

const app = express();
app.use(express.json())
app.use("/api/user",router) //  http://localhost:5000/api/user/login
app.use("/api/blog", blogRouter)

mongoose.connect("mongodb+srv://admin:boK44KOEp3EUEoKH@cluster0.q8hartk.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0")
.then(() => app.listen(5000))
.then(() => console.log("Connected to database and listening to localhost 5000"))
.catch((err) => console.log(err))


// boK44KOEp3EUEoKH