const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { getAllImageLinks } = require("./controller");

const app = express();

let whiteList = ["http://localhost:3000", "https://assetsmania.netlify.app"];

var corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

app.use(bodyParser.json({ urlencoded: true }));

app.post("/api/get_images", getAllImageLinks);

app.use("*", (req, res) => {
  res.status(400).json({ msg: "Not Found" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`running on port ${PORT}`));
