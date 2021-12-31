import mongoose from 'mongoose';

const { Schema } = mongoose;

const handlerSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
    },
    image_url: {
      type: String,
    },
    followers_count: {
      type: Number,
    },
    following_count: {
      type: Number,
    },
    repo_count: {
      type: Number,
    },
    member_since_date: {
      type: Date,
    },
  },
  { versionKey: false },
);

const Handler = mongoose.model('Handler', handlerSchema);

export default Handler;
