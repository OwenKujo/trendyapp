import { Pin } from "../models/pinModel.js";
import TryCatch from "../utils/TryCatch.js";
import getDataUrl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";

// Create a new Pin
export const createPin = TryCatch(async (req, res) => {
  const { title, pin, link, tags } = req.body; // Accept link and tags from request body
  const file = req.file;

  if (!title || !pin) {
    return res.status(400).json({ message: "Title and description are required." });
  }

  if (!file) {
    return res.status(400).json({ message: "Image file is required." });
  }

  const fileUrl = getDataUrl(file);
  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

  const newPin = await Pin.create({
    title,
    pin,
    link: link || null, // Link is optional
    tags: tags ? JSON.parse(tags) : [], // Parse tags if provided
    image: {
      id: cloud.public_id,
      url: cloud.secure_url,
    },
    owner: req.user._id,
  });

  res.json({
    message: "Pin Created",
    pin: newPin,
  });
});

// Get all Pins
export const getAllPins = TryCatch(async (req, res) => {
  const pins = await Pin.find().sort({ createdAt: -1 });
  res.json(pins);
});

// Get a single Pin by ID
export const getSinglePin = TryCatch(async (req, res) => {
  const pin = await Pin.findById(req.params.id).populate("owner", "-password");
  if (!pin) return res.status(404).json({ message: "Pin not found" });
  res.json(pin);
});

// Comment on a Pin
export const commentOnPin = TryCatch(async (req, res) => {
  const { comment } = req.body;
  const pin = await Pin.findById(req.params.id);

  if (!pin)
    return res.status(404).json({ message: "No Pin with this id" });

  pin.comments.push({
    user: req.user._id,
    name: req.user.name,
    comment,
  });

  await pin.save();

  res.json({ message: "Comment Added" });
});

// Delete a comment from a Pin
export const deleteComment = TryCatch(async (req, res) => {
  const { commentId } = req.query;
  const pin = await Pin.findById(req.params.id);

  if (!pin)
    return res.status(404).json({ message: "No Pin with this id" });

  if (!commentId)
    return res.status(400).json({ message: "Please provide comment ID" });

  const commentIndex = pin.comments.findIndex(
    (item) => item._id.toString() === commentId.toString()
  );

  if (commentIndex === -1) {
    return res.status(404).json({ message: "Comment not found" });
  }

  const comment = pin.comments[commentIndex];

  if (comment.user.toString() === req.user._id.toString()) {
    pin.comments.splice(commentIndex, 1);
    await pin.save();
    return res.json({ message: "Comment Deleted" });
  } else {
    return res.status(403).json({ message: "You are not the owner of this comment" });
  }
});

// Delete a Pin
export const deletePin = TryCatch(async (req, res) => {
  const pin = await Pin.findById(req.params.id);

  if (!pin)
    return res.status(404).json({ message: "No Pin with this id" });

  if (pin.owner.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Unauthorized" });

  await cloudinary.v2.uploader.destroy(pin.image.id);
  await pin.deleteOne();

  res.json({ message: "Pin Deleted" });
});

// Update a Pin
export const updatePin = TryCatch(async (req, res) => {
  const { title, pin: pinDesc, link, tags } = req.body;
  const pin = await Pin.findById(req.params.id);

  if (!pin)
    return res.status(404).json({ message: "No Pin with this id" });

  if (pin.owner.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Unauthorized" });

  // Update only if values are provided, otherwise keep original
  pin.title = title || pin.title;
  pin.pin = pinDesc || pin.pin;
  pin.link = link || pin.link;
  pin.tags = tags ? JSON.parse(tags) : pin.tags;

  await pin.save();

  res.json({ message: "Pin updated" });
});
