const userService = require("../services/user.service");

exports.getUsers = async(req, res) => {
  res.json(await userService.findAll());
};

exports.registerUser = async (req, res) => {
  const { username, password, age, school, email } = req.body;
  res.json(userService.register(username, password, age, school, email));
};

exports.updateUser = async (req, res) => {
  userService.update();
  console.log("updata");
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  res.json(await userService.login(username, password));
};

exports.authUser = async (req, res) => {
    const token = req.headers.authorization
    res.json(await userService.auth(token));
  };