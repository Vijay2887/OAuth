import { Router } from "express";
import { body } from "express-validator";
import passport from "../strategies/googleStrategy.mjs";

const route = Router();

// get all users

route.get("/api/users", async (request, response) => {
  const users = await User.find();
  response.status(200).send(users);
});

// add a new user

route.post(
  "/api/users",
  [
    body("username").notEmpty().withMessage("Username cannot be empty"),
    body("email").notEmpty().withMessage("need an email"),
    body("password").notEmpty().withMessage("need a password"),
  ],
  async (request, response) => {
    try {
      const result = validationResult(request);
      if (!result.isEmpty()) return response.status(400).send(result.array());
      const { body } = request;
      body.password = hashPassword(body.password);
      const newUser = await new User(body).save();
      const { username, email } = newUser;
      return response.status(200).send({ username, email });
    } catch (error) {
      return response.status(400).send(error);
    }
  }
);

//authenticate a user

route.post(
  "/api/login",
  passport.authenticate("local"),
  (request, response) => {
    console.log(request.session);
    response.sendStatus(200);
  }
);

route.get("/api/login/status", (request, response) => {
  if (!request.session.passport)
    return response.status(401).send("Please Authorize first");

  // const { username } = request.user;
  // response.status(200).send({ username: username });
  response.sendStatus(200);
});

route.get("/api/auth/google", passport.authenticate("google"));

route.get(
  "/api/google/redirect",
  passport.authenticate("google"),
  (request, response) => {
    console.log(request.session);
    console.log(request.user);
    const { displayName, email } = request.user;
    response.status(200).send({ name: displayName, email: email });
  }
);

export default route;
