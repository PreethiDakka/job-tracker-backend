
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/jobs", jobRoutes);
app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:");
    console.log(err.message);
  });
