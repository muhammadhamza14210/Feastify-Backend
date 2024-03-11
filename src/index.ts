import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import MyUserRoute from "./routes/MyUserRoute";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to MongoDB"));

const app = express();
app.use(express.json());
app.use(cors());

app.listen(7000, () => {
  console.log(`Server is running on port 7000.`);
});

app.get("/health", async (req: Request, res: Response) => {
  res.send({message: "Server is running."});
});

app.use("/api/my/user", MyUserRoute);
