// models/Pin.js

import mongoose from "mongoose";

const pinSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  image: {
    id: String,
    url: String,
  },
  link: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: String,
      comment: String,
    },
  ],
  tags: [String], // Add tags array
}, { timestamps: true });

export const Pin = mongoose.model("Pin", pinSchema);
