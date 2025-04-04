import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import menuRoutes from "./routes/menu.routes.js"; 
import orderRoutes from "./routes/order.routes.js";
import tableRoutes from "./routes/table.routes.js";

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
app.use("/order", orderRoutes); 
app.use("/table", tableRoutes);

app.get("/", (req, res) => {
  res.send("MongoDB is connected and server is running!");
});

app.listen(5000,"0.0.0.0", () => console.log(`Server running on port 0.0.0.0:5000`));