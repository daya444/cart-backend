import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoute.js";
import cartRoutes from "./routes/cartRoutes.js";
import checkOutRoutes from "./routes/checkoutRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import subscribeRoute from "./routes/subscribeRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminProductRoutes from "./routes/prductAdminRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5174",
  "https://cart-frontend-1sdxbrwcd-dayas-projects-e43cf763.vercel.app",
  "https://cart-frontend-three.vercel.app",
  "https://daya-cart.netlify.app"
];

// CORS
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false
  })
);

// Handle preflight requests
app.options(
  "*",
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false
  })
);

app.use(express.json());

// Database
connectDB();

const PORT = process.env.PORT || 3000;

// Test Route
app.get("/", (req, res) => {
  res.send("hello daya");
});

// User Routes
app.use("/api/user", userRoutes);

// Product Routes
app.use("/api/products", productRoutes);

// Cart Routes
app.use("/api/cart", cartRoutes);

// Checkout Routes
app.use("/api/checkout", checkOutRoutes);

// Order Routes
app.use("/api/orders", orderRoutes);

// Upload Routes
app.use("/api/upload", uploadRoutes);

// Subscribe Route
app.use("/api", subscribeRoute);

// Admin Routes
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});