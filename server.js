const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const postRoutes = require("./routes/post-routes");
const contactRoutes = require("./routes/contact-routes");
const postApiRoutes = require("./routes/api-post-routes");
const createPath = require("./helpers/create-path");

const app = express();
app.set("view engine", "ejs");

const hostname = "127.0.0.1";
const PORT = 3000;
const db =
  "mongodb+srv://baykovF:Pass321@cluster0.2oo46.mongodb.net/node-blog?retryWrites=true&w=majority";

mongoose
  .connect(db)
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(express.urlencoded({ extended: false }));
app.use(express.static("styles"));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  const title = "Home";
  res.render(createPath("index"), { title });
});

app.use(postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);

app.use((req, res) => {
  const title = "Error Page";
  res.status(404).render(createPath("error"), { title });
});
