// controllers/pinControllers.js

import { Pin } from '../models/Pin.js'; // Adjust the import path

export const createPin = async (req, res) => {
  try {
    const { title, pin, link, tags } = req.body; // Get link and tags from body
    const newPin = new Pin({
      title,
      pin,
      link, // Store the link here
      tags, // Store the tags
      owner: req.user._id,
      image: req.file ? { url: req.file.path } : undefined, // Assuming multer handles file uploads
    });

    await newPin.save();
    res.status(201).json(newPin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSinglePin = async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id).populate("owner", "name followers"); // Fetch pin and owner details
    if (!pin) return res.status(404).json({ message: "Pin not found" });

    res.status(200).json(pin); // Send the entire pin object including link
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Other controller methods (commentOnPin, deleteComment, etc.) remain unchanged
