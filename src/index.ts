import express from 'express';
import productRoutes from './routes/productRoutes';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json()); // Middleware to parse JSON
app.use('/store', productRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


//Sets up a server via Express on port 8080
//Parses JSON in the request body
//Mounts the productRoutes at the /store path
//Starts the server and listens for incoming requests on the specified port

//Improvements: logging middleware, error handling middleware