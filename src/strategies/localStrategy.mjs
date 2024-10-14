import Strategy from "passport-local";
import passport from "passport";
import User from "../database/schemas/userSchema.mjs";
import bcrypt from "bcrypt";

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await User.findOne({ username: username });
      if (!findUser) throw new Error("No such user found");
      if (!bcrypt.compareSync(password, findUser.password))
        throw new Error("Invalid password for the user");
      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);

//serializing the user

passport.serializeUser((user, done) => {
  done(null, user.id);
});

//deserializing the user

passport.deserializeUser(async (userId, done) => {
  try {
    const findUser = await User.findById(userId);
    if (!findUser) throw new Error("Unable to fetch user details");
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});
