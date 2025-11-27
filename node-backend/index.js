const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const FASTAPI_URL = process.env.FASTAPI_URL;

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "message required" });

    // Forward to FastAPI
    const resp = await axios.post(FASTAPI_URL, { message }, { timeout: 120000 });
    return res.json(resp.data);
  } catch (err) {
    console.error("Gateway error:", err.message || err);
    const status = err.response?.status || 500;
    const data = err.response?.data || { error: "Server error forwarding to AI service" };
    res.status(status).json(data);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Node gateway listening on http://localhost:${PORT} -> forwarding to ${FASTAPI_URL}`);
});
