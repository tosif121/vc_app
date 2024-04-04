const express = require("express");
const path = require("path");
const cors = require("cors");






const app = express();
app.use(express.json({ limit: "200mb" }));
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));



app.listen(3725);