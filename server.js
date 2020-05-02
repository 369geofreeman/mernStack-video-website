const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect datasbase
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API running"));

// User Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
// Video Routes
app.use("/api/videos", require("./routes/api/videos"));
app.use(
  "/api/categories/animalsbeingderps",
  require("./routes/api/categories/animalsbeingderps")
);
app.use(
  "/api/categories/natureisfuckinglit",
  require("./routes/api/categories/natureisfuckinglit")
);
app.use("/api/categories/catgifs", require("./routes/api/categories/catgifs"));
app.use("/api/categories/doggifs", require("./routes/api/categories/doggifs"));
app.use(
  "/api/categories/naturegifs",
  require("./routes/api/categories/naturegifs")
);
app.use("/api/categories/puppies", require("./routes/api/categories/puppies"));
app.use("/api/categories/owls", require("./routes/api/categories/owls"));
app.use(
  "/api/categories/hamstergifs",
  require("./routes/api/categories/hamstergifs")
);
app.use(
  "/api/categories/animalgifs",
  require("./routes/api/categories/animalgifs")
);
app.use("/api/categories/sharks", require("./routes/api/categories/sharks"));
app.use(
  "/api/categories/thalassophobia",
  require("./routes/api/categories/thalassophobia")
);
app.use(
  "/api/categories/thedepthsbelow",
  require("./routes/api/categories/thedepthsbelow")
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
