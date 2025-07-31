const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const prisma = require("../config/prismaClient");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const customFields = {
  usernameField: "email",
};
passport.use(
  new LocalStrategy(customFields, async (username, password, done) => {
    try {
      const author = await prisma.author.findUnique({
        where: {
          email: username,
        },
      });
      if (!author) {
        return done(null, false, { message: "Incorrect email" });
      }
      const match = await bcrypt.compare(password, author.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, author);
    } catch (err) {
      return done(err);
    }
  }),
);
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }),
);
