const express = require("express");
const cors = require("cors");
const userApi = require("./routes/user");
const cat = require("./routes/categories");
const podcastApi = require("./routes/podcast");
const cookieParser = require("cookie-parser");

require("dotenv").config();
require("./dbconnection");

const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"))
app.use(cors(
    {
        // This allows cross-origin requests only from frontend
        origin: ["http://localhost:3000"],

        // This allows the server to accept credentials (cookies, authorization headers, etc.) in the requests.
        credentials: true
    }
));

// Route setup
app.use("/api/v1", userApi);
app.use("/api/v1", cat);
app.use("/api/v1", podcastApi);

// Basic route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Start server
const port = process.env.PORT || 3000; // Default port if not specified
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
