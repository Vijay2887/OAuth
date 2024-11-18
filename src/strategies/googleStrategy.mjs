import passport from "passport";
import Strategy from "passport-google-oauth20";
import GoogleUser from "../database/schemas/googleUserSchema.mjs";

export default passport.use(
  new Strategy(
    {
      clientID:
        "YOUR CLIENT ID",
      clientSecret: "YOUR CLIENT SECRET",
      callbackURL: "http://localhost:3000/api/google/redirect",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
    },
    async (accessToken, refreshToken, profile, done) => {
      let findUser;
      try {
        findUser = await GoogleUser.findOne({ googleID: profile.id });
      } catch (error) {
        console.log(error);
        return done(error, null);
      }

      try {
        if (!findUser) {
          const newGoogleUser = await new GoogleUser({
            displayName: profile.displayName,
            googleID: profile.id,
            email: profile.emails[0].value,
          }).save();
          return done(null, newGoogleUser);
        }
        return done(null, findUser);
      } catch (error) {
        console.log(error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  let findUser;
  try {
    findUser = await GoogleUser.findById(id);
  } catch (error) {
    console.log(error);
    done(error, null);
  }
  done(null, findUser);
});
