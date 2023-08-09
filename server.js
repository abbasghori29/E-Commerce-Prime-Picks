import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cors from 'cors';
import path from 'path';
import {fileURLToPath} from 'url'; // this is used because we are using module method to import 
//configure .env
dotenv.config();

// database config
connectDB();

// rest objects
const app = express()

//esModuleErrorFix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './client/build')))// this was added at the deployment time
//Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)


// rest api
// app.get('/', (req, res) => {
//    res.send("<h1>Prime Picks!</h1>")
// })
app.use('*', function (req, res) {  // this was added at the deployemnt time
   res.sendFile(path.join(__dirname, './client/build/index.html'))
})


//PORT
// env file is used to maintain security so that no one can see our sensitive information
// after 2 bars 8080 is also given to tell if there is any issue in env file so use 8080 port by default
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
   console.log(`Server listening at port ${PORT}`)
})
