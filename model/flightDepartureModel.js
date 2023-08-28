const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },

    data: {
      type: [
        {
          userId: {
            type: String,
          },
          flightName: { type: String, required: true },
          flightNumber: { type: String, required: true },
          image: { type: String, required: true },
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
