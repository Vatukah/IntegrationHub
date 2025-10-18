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
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // if you want cookies (not needed for token auth)
}));


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
