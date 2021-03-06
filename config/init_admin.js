const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { BCRYPT_ROUNDS, JWT_EXPIRY, EXPIRY_DAYS } = require("./consts");

const setupInitAdmin = async () => {
  try {
    const initial_admin_username = process.env["INITIAL_ADMIN_USERNAME"];
    const initial_admin_password = process.env["INITIAL_ADMIN_PASSWORD"];

    existingAdminUser = await User.findOne({ name: initial_admin_username });

    if (!existingAdminUser) {
      const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
      const pw = await bcrypt.hash(initial_admin_password, salt);
      let expiry = new Date();
      expiry.setDate(expiry.getDate() + EXPIRY_DAYS);

      initAdmin = new User({
        name: initial_admin_username,
        password: pw,
        expires: expiry,
        hasLoggedInYet: false,
        isAdmin: true
      });

      await initAdmin.save();
    }

    // TODO: Do we want to reset the password if it's been changed? Probably not...
  } catch (err) {
    console.error(err);
  }
};

module.exports = setupInitAdmin;
