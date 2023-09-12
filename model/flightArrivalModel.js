const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    data: {
      type: [
        {
          logonumber: {
            src: {
              type: String,
              required: true,
            }, // Source for the logonumber
            number: {
              type: String,
              required: true,
            }, // The logonumber itself
          },

          carrier: { type: String, required: true },
          origin: { type: String, required: true },
          via: { type: String, default: "--" },
          time: { type: String, required: true },
          terminal: { type: Number },
          belt: { type: Number },
          status: { type: String, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);

const FlightDeparture = mongoose.model("FlightDeparture", flightSchema);

module.exports = FlightDeparture;
