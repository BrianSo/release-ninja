const crypto = require("crypto");
const mongoose = require("mongoose");
const { bcrypt, bcryptCompare } = require('../utils/encryptions');

const schema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,

  tokens: Array,
}, {
  timestamps: true
});

/**
 * Password hash middleware.
 */
schema.pre("save", async function save() {
  const user = this;
  if (!user.isModified("password")) {
    return;
  }
  user.password = await bcrypt(user.password);
});

schema.methods.comparePassword = async function(candidatePassword){
  return await bcryptCompare(candidatePassword, this.password);
};

/**
 * Helper method for getting user's gravatar.
 */
schema.methods.gravatar = function (size = 200) {
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash("md5").update(this.email).digest("hex");
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

schema.options.toJSON = {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
};

const User = mongoose.model("User", schema);
module.exports = User;
