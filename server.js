import express from "express";
import cors from "cors";
import { ENV_VARS } from "./config/envVars.js";
import connectDB from "./config/connectionDb.js";
import passport from "passport";
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./config/passport.js";
import { protectRoute } from "./middleware/protectRoute.js";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import castRoutes from "./routes/cast.route.js"
// import path from "path";

// const __dirname = path.resolve();

const app = express();

const mongoStore = MongoStore.create({
  mongoUrl: ENV_VARS.MONGO_URI, // Use the same database name
  collectionName: "sessions", // Optional: Customize session collection name
});


app.use(cors({
  origin: "https://heartfelt-squirrel-30987d.netlify.app",
  methods:["POST","GET"],
  credentials: true,
}));
// app.use(cors())


// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://heartfelt-squirrel-30987d.netlify.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: mongoStore, // Use MongoDB store
    cookie: {
      secure: false, // Set to `true` if using HTTPS
      httpOnly: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 day
      sameSite: "None",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie",protectRoute, movieRoutes);
app.use("/api/v1/tv",protectRoute, tvRoutes);
app.use("/api/v1/cast",protectRoute, castRoutes);
app.use("/api/v1/search",protectRoute, searchRoutes);


// if (ENV_VARS.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));

// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }

app.listen(ENV_VARS.PORT, () => {
  console.log(`Server started at http://localhost:${ENV_VARS.PORT}`);
  connectDB();
});



