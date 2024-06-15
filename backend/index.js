import express from "express";
import { PORT } from "./config.js";
import bookRouter from "./routes/book.route.js";
import cors from "cors";
import connectDB from "./db/db.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Two Options: 1. Allow all origins with default of cors(*)
app.use(cors());
// 2. Allow custom origin (have more control over it)
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.use("/books", bookRouter);

// connecting to DB
connectDB();

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
