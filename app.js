const express = require("express"),
  cors = require("cors"),
  User = require("./models/user"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  app = express(),
  PORT = 4000;

const addPetRoute = require("./routes/addpet");
const authRoutes = require("./routes/auth");
const showUsersRoute = require("./routes/showUsers");
const petFeedRoute = require("./routes/petFeed");
const myPets = require("./routes/myPets");
const searchPet = require("./routes/searchPet");
const updateUser = require("./routes/updateUser");
const editPet = require("./routes/editPet");

mongoose.connect("mongodb://localhost:27017/adopty_auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "secretserver",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(authRoutes);
app.use(addPetRoute);
app.use(showUsersRoute);
app.use(petFeedRoute);
app.use(myPets);
app.use(searchPet);
app.use(updateUser);
app.use(editPet);

app.listen(PORT, () => {
  console.log("Listening on port 4000");
});
