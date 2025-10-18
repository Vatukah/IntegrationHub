import 'dotenv/config'
import express from "express";
import actionsRouter from "./src/routes/actions.js";
import gmailRouter from './src/routes/gmail.js'
import activityLogRouter from './src/routes/activityLog.js';
import utilRouter from './src/routes/util.js';
import cors from 'cors';


const app = express();
app.use(express.json());

// Allow requests from your frontend
const allowedOrigins = [
  "http://localhost:5173",          // Local development
  "https://integration-hub-ippe.vercel.app"   // Production frontend       // Custom domain (optional)
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // required if you're using cookies or sessions
  })
);

app.use("/actions", actionsRouter);
app.use("/api/gmail", gmailRouter);
app.use("/activity-logs",activityLogRouter);
app.use("/user",utilRouter);


app.get("/", (req, res) => res.json({ ok: true, uptime: process.uptime() }));

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(
    `AI Compliance Assistant backend running on http://localhost:${port}`
  )
);
