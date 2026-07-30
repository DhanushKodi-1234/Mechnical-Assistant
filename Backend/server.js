import express from "express";
import cors from "cors";
import "dotenv/config";

import coonectdb from "./appsail-nodejs/src/config/connect.js";
import router from "./appsail-nodejs/src/routes/check.routes.js";
import r from "./appsail-nodejs/src/routes/payment.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:4200",
    "https://mechnical-assistant.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));
app.options("*", cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.get("/test", (req, res) => {
  res.json({ message: "Latest deployment working" });
});
app.use("/api/users", router);
app.use("/api/payment", r);

const port = process.env.X_ZOHO_CATALYST_LISTEN_PORT || process.env.PORT || 3000;

app.listen(port, async () => {
  try {
    await coonectdb();
    console.log(`Connection successful. Server running on port ${port}`);
  } catch (err) {
    console.error(err);
    console.log("Running port is failed");
  }
});