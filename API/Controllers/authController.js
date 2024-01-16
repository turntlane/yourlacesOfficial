const User = require("../Models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ where: { email: email } });

  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) return res.status(401).json({ message: "Unauthorized" });

  const accessToken = jwt.sign(
    {
      UserInfo: {
        userID: foundUser.userID,
        email: foundUser.email,
        roles: foundUser.roles,
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { email: foundUser.email },
    process.env.JWT_REFRESH,
    { expiresIn: "20m" }
  );

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "None", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  console.log("access token: ", accessToken);
  // Send accessToken containing username and roles
  res.status(200).json({
    accessToken: accessToken,
    user: {
      userID: foundUser.userID,
      username: foundUser.username,
      email: foundUser.email,
      contactInfo: foundUser.contactInfo,
      userRating: foundUser.userRating,
      roles: foundUser.roles,
      createdAt: foundUser.createdAt,
    },
  });
};

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt)
    return res.status(401).json({ message: "Cookie Invalid?" });

  const refreshToken = cookies.jwt;

  jwt.verify(refreshToken, process.env.JWT_REFRESH, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Is this working" });

    const foundUser = await User.findOne({
      where: { email: decoded.email },
      // email: decoded.email,
    });

    if (!foundUser) return res.status(401).json({ message: "Unauthorized?" });

    const accessToken = jwt.sign(
      {
        UserInfo: {
          userID: foundUser.userID,
          email: foundUser.email,
          roles: foundUser.roles,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "20s" }
    );

    res.status(200).json({
      accessToken: accessToken,
      user: {
        userID: foundUser.userID,
        username: foundUser.username,
        email: foundUser.email,
        contactInfo: foundUser.contactInfo,
        userRating: foundUser.userRating,
        roles: foundUser.roles,
        createdAt: foundUser.createdAt,
      },
    });
  });
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

module.exports = {
  login,
  refresh,
  logout,
};
