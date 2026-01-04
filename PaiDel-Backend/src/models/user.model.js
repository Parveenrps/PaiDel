import mongoose, { Schema } from 'mongoose';

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

    address: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);
