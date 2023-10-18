const response = require("../module/sendResponse");
const userDb = require("../Schemas/imdbUserSchema");
const bcrypt = require("bcrypt");
module.exports = {
  // fix* do not send user password to frontend
  register: async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userDb({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    response(res, "Registration complete", false, user);
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await userDb.findOne({ email });
    const compare = await bcrypt.compare(password, user.password);
    if (compare) {
      return response(res, "Succesfully logged in", false, user);
    }
    return response(res, "password do not match", true);
  },
};
