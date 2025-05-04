import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import menuRoutes from "./routes/menu.routes.js"; 
import orderRoutes from "./routes/order.routes.js";
import tableRoutes from "./routes/table.routes.js";
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(cors()); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  });

app.use("/", authRoutes);
app.use("/menu", menuRoutes);
app.use("/order", orderRoutes); 
app.use("/table", tableRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); 

app.get("/", (req, res) => {
  res.send("MongoDB is connected and server is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));