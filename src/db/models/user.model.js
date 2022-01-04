import mongoose from 'mongoose';

const { Schema } = mongoose;

const handlerSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
    profileUrl: {
      type: String,
    },
    followersCount: {
      type: Number,
    },
    followingCount: {
      type: Number,
    },
    repoCount: {
      type: Number,
    },
    memberSinceDate: {
      type: Date,
    },
  },
  { versionKey: false },
);

const Handler = mongoose.model('Handler', handlerSchema);

export default Handler;
