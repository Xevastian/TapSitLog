import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import menuRoutes from "./routes/menu.routes.js"; 

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  });


app.use("/menu", menuRoutes);

app.get("/", (req, res) => {
  res.send("MongoDB is connected and server is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));