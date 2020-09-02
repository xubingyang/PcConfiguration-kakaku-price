const mongoose = require('mongoose');

const ConfigurationSchema = new mongoose.Schema(
  {
    date: Number,
    partDetails: {
      cpu: {
        name: String,
        quantity: Number,
        price: Number,
        link: String
      },
      motherboard: {
        name: String,
        quantity: Number,
        price: Number,
        link: String
      },
      memory: {
        name: String,
        quantity: Number,
        price: Number,
        link: String
      },
      ssd: {
        name: String,
        quantity: Number,
        price: Number,
        link: String
      },
      hdd: {
        name: String,
        quantity: Number,
        price: Number,
        link: String
      },
      graphicCard: {
        name: String,
        quantity: Number,
        price: Number,
        link: String
      },
      cooling: {
        name: String,
        quantity: Number,
        price: Number,
        link: String
      },
      powerUnit: {
        name: String,
        quantity: Number,
        price: Number,
        link: String
      },
      pcCase: {
        name: String,
        quantity: Number,
        price: Number,
        link: String
      },
      caseFan: {
        name: String,
        quantity: Number,
        price: Number,
        link: String
      },
      keyboard: {
        name: String,
        quantity: Number,
        price: Number,
        link: String
      },
      mouse: {
        name: String,
        quantity: Number,
        price: Number,
        link: String
      },
      monitor: {
        name: String,
        quantity: Number,
        price: Number,
        link: String
      },
      captureCard: {
        name: String,
        quantity: Number,
        price: Number,
        link: String
      },
      soundCard: {
        name: String,
        quantity: Number,
        price: Number,
        link: String
      }
    },
    total: Number,
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    }
  }
);

module.exports = mongoose.model('Configuration', ConfigurationSchema);
