import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: [true, 'Password is required'],
    },
    phoneNo: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    role:{
      type: String,
      required: true,
      lowercase: true,
      enum: ["user", "walker"]
    },
    refreshToken: {
      type: String
    },

    isOTPVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function(password) {
  return bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    { 
      id: this._id,
      role: this.role,
      isOTPVerified: this.isOTPVerified
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: '15m'
    }
  );
}

userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    { 
      id: this._id,
      role: this.role 
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: '7d'
    }
  );
}

export const User = mongoose.model('User', userSchema);
