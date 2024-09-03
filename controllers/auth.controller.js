import passport from "passport";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
/*
export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 6 characters long",
      });
    }

    const existingUserByUsername = await User.findOne({ username });

    if (existingUserByUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    const existingUserByEmail = await User.findOne({ email });

    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const images = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = images[Math.floor(Math.random() * (images.length - 1))];

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      image: image,
    });


    newUser.save();
    
     req.login(newUser, (err) => {
      if (err) console.log("here it come", err);
      else {
        console.log("logged in successfully");
        console.log(req.isAuthenticated());
      }
    });
    

    return res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json({ success: false, message: "Server side error" });
  }
}

export async function login(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Error in login controller", err.message);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    if (!user) {
      return res.status(400).json({
        success: false,
        message: info.message || "Invalid credentials",
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("Error logging in user", err.message);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }

      // No need for token generation, as session management is handled by MongoStore

      return res.status(200).json({
        success: true,
        user: {
          ...user._doc,
          password: "",
        },
      });
    });
  })(req, res, next);
}
*/
export async function logout(req, res) {
  try {
    // console.log(req.user);

    req.logout((err) => {
      if (err)
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      else
        res
          .status(200)
          .json({ success: true, message: "Logged out successfully" });
    });
  } catch (error) {
    // console.log("Error in logout controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function authCheck(req, res) {
  try {
    
    return res.status(200).json({ success: true, user: req.user });
  } catch (err) {
    // console.log("Error in authCheck controller", err.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
}













async function handleLogin(req, res) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return reject({ status: 500, message: 'Internal server error' });
      }
      if (!user) {
        return reject({
          status: 400,
          message: info.message || 'Invalid credentials',
        });
      }
      req.logIn(user, (err) => {
        if (err) {
          return reject({ status: 500, message: 'Error logging in user' });
        }
        resolve({
          status: 200,
          user: { ...user._doc, password: '' },
        });
      });
    })(req, res);
  });
}

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Email',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({
        success: false,
        message: 'Username already exists',
      });
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const images = ['/avatar1.png', '/avatar2.png', '/avatar3.png'];
    const image = images[Math.floor(Math.random() * images.length)];

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      image: image,
    });

    await newUser.save();

    // Use the extracted login logic
    try {
      const loginResult = await handleLogin(req, res);
      return res.status(loginResult.status).json({
        success: true,
        user: loginResult.user,
      });
    } catch (loginError) {
      return res.status(loginError.status).json({
        success: false,
        message: loginError.message,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Server side error',
    });
  }
}

export async function login(req, res, next) {
  try {
    const loginResult = await handleLogin(req, res);
    return res.status(loginResult.status).json({
      success: true,
      user: loginResult.user,
    });
  } catch (loginError) {
    return res.status(loginError.status).json({
      success: false,
      message: loginError.message,
    });
  }
}