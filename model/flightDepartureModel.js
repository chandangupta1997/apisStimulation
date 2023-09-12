const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },

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
          destination: { type: String, required: true },
          via: { type: String, default: "-" },
          time: { type: String, required: true },
          terminal: { type: Number },
          gate: { type: Number },
          status: { type: String, required: true },
        },
      ],
    },
  },

  { timestamps: true }
);

const FlightArrival = mongoose.model("FlightArrival", flightSchema);

module.exports = FlightArrival;
