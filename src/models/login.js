const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
});
// decides the "Strength" of the salt (should not be higher as salting will take long time and occupy CPU time (blocking) - nothing else will execute in the app in that time)
const SALT_FACTOR = 10;
loginSchema.pre("save", function (done) {
  // DO NOT use arrow function here
  const user = this; // const user -> new User()

  if (!user.isModified("password")) {
    done();
    return;
  }

  // genSalt() is async
  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) {
      return done(err); // Mongoose will not insert the user document
    }

    bcrypt.hash(user.password, salt, function (err, hashedPassword) {
      if (err) {
        return done(err);
      }

      user.password = hashedPassword;
      done(); // pass no arguments to done() to signify success
    });
  });
});
mongoose.model("Login", loginSchema);
