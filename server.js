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

// 1. Load env vars and connect DB early
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// 2. Setup allowed frontend domains
const allowedOrigins = [
  "https://cart-frontend-1sdxbrwcd-dayas-projects-e43cf763.vercel.app",
  "https://cart-frontend-three.vercel.app"
];

// 3. CORS Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false // you're not using cookies
}));

// 4. Parse JSON requests
app.use(express.json());

// 5. Simple API status route
app.get("/", (req, res) => {
  res.send("hello daya");
});

// 6. API routes
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkOutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoute);

// 7. Admin routes
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

// 8. Catch-all for unmatched routes
app.use((req, res, next) => {
  console.log("Unhandled request from:", req.headers.origin);
  res.status(404).json({ message: "Route Not Found" });
});

// 9. Error handler middleware
app.use((err, req, res, next) => {
  console.error("CORS or other error:", err.message);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

// 10. Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
