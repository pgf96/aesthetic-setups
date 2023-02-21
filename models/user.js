const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    required: true
  },
  roles: {
    type: [String],
    default: ['user'],  
    validate: {
      validator: function(roles) {
        return roles.every(role => role === 'user' || role === 'guest')
      },
      message: 'cannot create a role other than user or guest'
      
    },
    // lowercase: true does not work  
    // change role to lowercase before saving to db
    set: function(roles) {
      return roles.map(role => role.toLowerCase())
    }
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

userSchema.pre('save', async function(next) {
  // 'this' is the user doc
  if (!this.isModified('password')) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});


module.exports = mongoose.model('User', userSchema);