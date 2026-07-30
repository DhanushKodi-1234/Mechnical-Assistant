// import Express from "express";
// const app = Express();
// const port = process.env.X_ZOHO_CATALYST_LISTEN_PORT || 9000;

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
//   console.log(`http://localhost:${port}/`);
// });
import express from "express";
import cors from "cors";
import "dotenv/config";

import coonectdb from "./src/config/connect.js";
import router from "./src/routes/check.routes.js";
import r from "./src/routes/payment.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:4200",
    "https://mechnical-assistant.vercel.app"
  ]
}));

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/users", router);
app.use("/api/payment", r);

const port = process.env.X_ZOHO_CATALYST_LISTEN_PORT || 9000;

coonectdb().then(() => {
  app.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
}).catch(console.error);