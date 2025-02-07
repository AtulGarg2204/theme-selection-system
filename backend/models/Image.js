const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  websiteType: {
    type: String,
    enum: ['E-commerce', 'Service-Based', 'Informative'],
    required: true
  },
  designTone: {
    type: String,
    enum: ['Professional', 'Playful and Chill', 'Relax'],
    required: true
  },
  status: {
    type: String,
    enum: ['Approved', 'Pending'],
    default: 'Pending'
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Image', imageSchema);