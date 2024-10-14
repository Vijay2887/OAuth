import express from "express";
import mongoose from "mongoose";
import route from "./routes/userRoutes.mjs";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";

mongoose
  .connect("mongodb://localhost:27017/testDB")
  .then((value) => console.log("database connected"))
  .catch((error) => console.log(error));

const app = express();
app.use(express.json());
app.use(
  session({
    secret: "vijaya simha",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(route);

app.listen(3000, () => {
  console.log("Running at port 3000");
});

app.get("/", (request, response) => {
  response.status(200).send("Hello World");
});
