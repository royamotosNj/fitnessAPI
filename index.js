const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoute = require("./routes/user");
const workoutRoutes = require("./routes/workout");

require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGODB_STRING);

mongoose.connection.once("open", () =>
  console.log("Now connected to MongoDB Atlas")
);

const corsOptions = {
  origin: ["http://localhost:8000", "http://localhost:3000"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/users", userRoute);
app.use("/workouts", workoutRoutes);

if (require.main === module) {
  app.listen(process.env.PORT || 4000, () =>
    console.log(`API is now online on port ${process.env.PORT || 4000}`)
  );
}

module.exports = { app, mongoose };
