import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { register } from './controllers/auth.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/post.js';
import { verifyToken } from './middleware/auth.js';
import { createPost } from './controllers/posts.js';

/* configuration */
const __filename = fileURLToPath(import.meta.url); // Get the current filename using Node.js's import.meta.url
const __dirname = path.dirname(__filename); // Get the directory name of the current file
dotenv.config(); // Load environment variables from a .env file into process.env

const app = express(); // Create an instance of the Express application

// Middleware for handling JSON parsing
app.use(express.json()); // This line should be app.use(express.json()); to correctly parse JSON data from incoming requests

// Middleware for enhancing security (e.g., setting HTTP headers)
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// Middleware for request logging
app.use(morgan('common'));

// Middleware for parsing JSON data from requests with extended options
app.use(bodyParser.json({ limit: '30mb', extended: true }));

// Middleware for parsing URL-encoded data from requests with extended options
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// Middleware for enabling Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Serve static files from the specified directory
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
// Configure multer to handle file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets'); // Specify the destination directory for storing uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Specify how the uploaded files should be named
  },
});

const upload = multer({ storage }); // Create a multer instance with the specified storage configuration

/*ROUTES WITH FILES*/
app.use('/auth/register', upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single('picture'), createPost);

/*ROUTES WITHOUT FILES*/
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

/* DATABASE MONGOOSE CONNECTION*/
const PORT = process.env.PORT || 5000; // Specify the port number for the server
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((err) => console.error(`${err} did not connect`));
