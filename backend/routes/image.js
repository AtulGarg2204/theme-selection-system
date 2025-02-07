const express = require('express');
const router = express.Router();
const Image = require('../models/Image');

// GET /api/images/get-approved
router.get('/get-approved', async (req, res) => {
  try {
    console.log("hello");
    const { websiteType, designTone } = req.query;
    
    const query = {
      status: 'Approved',
      ...(websiteType && { websiteType }),
      ...(designTone && { designTone })
    };
    console.log(query);
    const images = await Image.find(query);
    console.log(images,"images");
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Add new image
router.post('/add', async (req, res) => {
  try {
    const { imageUrl, websiteType, designTone } = req.body;
    
    const newImage = new Image({
      imageUrl,
      websiteType,
      designTone,
      status: 'Pending', // Default to pending for review
      uploadDate: new Date()
    });

    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT - Update image details
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl, websiteType, designTone, status } = req.body;

    const updatedImage = await Image.findByIdAndUpdate(
      id,
      {
        imageUrl,
        websiteType,
        designTone,
        status,
        uploadDate: new Date()
      },
      { new: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.json(updatedImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE - Remove image
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedImage = await Image.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Get all images for vendor (including pending)
router.get('/vendor-images', async (req, res) => {
  try {
    const images = await Image.find().sort({ uploadDate: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
