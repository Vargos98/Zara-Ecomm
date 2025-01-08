import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose'; // Import mongoose

dotenv.config(); // Configure dotenv

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
// error handler
app.use((err,erq,res,next)=>{
  const status = err.status || 500;
  const message = err.message || "Something went wrong"
  return res.status(status).json({
    success:false,
    status,
    message,
    
  })
})

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from the server!",
  });
});

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch(() => {
      console.error("Error connecting to MongoDB");
    });
};

const startServer = async () => {
  try {
    await connectDB(); // Call connectDB to connect to MongoDB
    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  } catch (error) {
    console.error("Error starting server", error);
    process.exit(1);
  }
};

startServer();
