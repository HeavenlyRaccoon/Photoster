const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

const generateJwt = (id, login, nickname, role) => {
  return jwt.sign({ id, login, nickname, role }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

class UserController {
  async signup(req, res, next) {
    const { login, password, email, nickname } = req.body;
    if (!login || !password || !email || !nickname) {
      return next(ApiError.badRequest("Missing fields"));
    }
    const user = await User.findOne({ where: { login } });
    if (user) {
      return next(ApiError.badRequest("User already exists"));
    }
    const hash = await bcrypt.hash(password, 5);
    const newUser = await User.create({
      login,
      password: hash,
      email,
      nickname,
    });
    const token = generateJwt(
      newUser.id,
      newUser.login,
      newUser.nickname,
      newUser.role
    );
    return res.json({ token });
  }

  async signin(req, res, next) {
    const { login, password } = req.body;
    const user = await User.findOne({ where: { login } });
    if (!user) {
      return next(ApiError.badRequest("User not found"));
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return next(ApiError.badRequest("Invalid password"));
    }
    const token = generateJwt(user.id, user.login, user.nickname, user.role);
    return res.json({ token });
  }

  async checkAuth(req, res, next) {
    const token = generateJwt(
      req.user.id,
      req.user.login,
      req.user.nickname,
      req.user.role
    );
    return res.json({ token });
  }

  async edit(req, res) {}
}

module.exports = new UserController();
