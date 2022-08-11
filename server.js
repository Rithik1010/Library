if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");

const app = express();
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));

app.use("/", indexRouter);
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("Server is connected to MongoDB"));

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running!");
});

