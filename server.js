const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");

const app = express();

// db config
const db = require("./config/keys").mongoURI;

// Connect to mongoDb
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDb connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("THIS SONGS ABOUT YOUR FUCKING MOTHER");
});

// Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
