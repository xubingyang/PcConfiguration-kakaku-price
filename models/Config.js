const mongoose = require('mongoose');

const ConfigSchema = new mongoose.Schema(
  {
    date: Number,
    partDetails: {
      cpu: {
        quantity: Number,
        link: String
      },
      motherboard: {
        quantity: Number,
        link: String
      },
      memory: {
        quantity: Number,
        link: String
      },
      ssd: {
        quantity: Number,
        link: String
      },
      hdd: {
        quantity: Number,
        link: String
      },
      graphicCard: {
        quantity: Number,
        link: String
      },
      cooling: {
        quantity: Number,
        link: String
      },
      powerUnit: {
        quantity: Number,
        link: String
      },
      pcCase: {
        quantity: Number,
        link: String
      },
      caseFan: {
        quantity: Number,
        link: String
      },
      keyboard: {
        quantity: Number,
        link: String
      },
      mouse: {
        quantity: Number,
        link: String
      },
      monitor: {
        quantity: Number,
        link: String
      },
      captureCard: {
        quantity: Number,
        link: String
      },
      soundCard: {
        quantity: Number,
        link: String
      }
    },
    totalAmount:Number,
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
      }
    }
);

module.exports = mongoose.model('Config', ConfigSchema);
