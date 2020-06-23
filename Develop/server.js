const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

//routes
app.use(require("./routes/routes.js"));
app.use(require("./routes/htmlroutes.js"))

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});