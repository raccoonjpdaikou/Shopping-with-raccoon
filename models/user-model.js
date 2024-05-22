const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 20,
    required: true,
  },
  role: {
    type: String,
    enum: [process.env.ADMIN_PASSWORD, "customer"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// instance methods
userSchema.methods.isAdmin = function () {
  return this.role == process.env.ADMIN_PASSWORD;
};

userSchema.methods.isCustomer = function () {
  return this.role == "customer";
};

userSchema.methods.comparePassword = async function (password, cb) {
  let result;
  try {
    result = await bcrypt.compare(password, this.password);
    return cb(null, result);
  } catch (e) {
    return cb(e, result);
  }
};

// mongoose middlewares
// 若使用者為新用戶，或者是正在更改密碼，則將密碼進行雜湊處理
userSchema.pre("save", async function (next) {
  // this 代表 mongoDB 內的 document
  if (this.isNew) {
    //密碼雜湊處理
    const hashValue = await bcrypt.hash(this.password, 10);
    this.password = hashValue;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
