const response = require("../module/sendResponse");
const userDb = require("../Schemas/imdbUserSchema");
module.exports = {
  validateRegistration: async (req, res, next) => {
    const { username, email } = req.body;
    const user = await userDb.findOne({ email });
    if (user) {
      if (user.username === username)
        return response(res, "User already exists", true);

      if (user.email === email)
        return response(res, "This email is already in use", true);
    }

    next();
  },
  validateLogin: async (req, res, next) => {
    const { email } = req.body;
    const user = await userDb.findOne({ email });
    if (!user) {
      return response(res, "user with this username does not exist", true);
    }
    next();
  },
};
