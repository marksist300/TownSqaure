const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const connectionToMongoDB = require("./config/dbConfig");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT;

//connection to DB
connectionToMongoDB();

//middleware to control CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
);
//middleware to access body data
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(helmet());
app.use(morgan("common"));
//Routes
app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/post", require("./routes/posts"));

app.get("/", (req, res) => {
  res.send("<h1>A page with nothing on it</h1>");
});

app.listen(PORT || 3000, () => {
  console.log(`Server running on port ${PORT}`);
});
