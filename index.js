const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Message = require("./models/message");

const app = express();

// ✅ Use Render's environment variable or fallback to 3000
const PORT = process.env.PORT || 3000;

// ✅ Use environment variable for MongoDB (Render provides it)
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolioDB";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "templates/index.html"))
);
app.get("/about.html", (req, res) =>
  res.sendFile(path.join(__dirname, "templates/about.html"))
);
app.get("/services.html", (req, res) =>
  res.sendFile(path.join(__dirname, "templates/services.html"))
);
app.get("/contact.html", (req, res) =>
  res.sendFile(path.join(__dirname, "templates/contact.html"))
);

// POST route to save contact messages
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.redirect("/contact.html?success=true");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while saving message");
  }
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
