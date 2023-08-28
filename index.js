const express = require("express");
const chance = require("chance");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const connectionString =
  "mongodb+srv://chandan:Chandan%40q23@cluster0.nrci4xc.mongodb.net/flightData?retryWrites=true&w=majority";

const flightDepartureModel = require("./model/flightDepartureModel");
const flightArrivalModel = require("./model/flightArrivalModel");
const { DateTime } = require("luxon");



mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

const airlines = [
  {
    Name: "Qatar Airways ",
    Image:
      "https://www.qatarairways.com/content/dam/qatar/images/qr-official-logo.png",
  },
  {
    Name: "Singapore Airlines",
    Image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/1200px-Singapore_Airlines_Logo_2.svg.png",
  },

  {
    Name: "Emirates",
    Image: "https://c.ekstatic.net/ecl/logos/emirates/emirates-logo-badge.png",
  },
  {
    Name: "Delta AirLines",
    Image:
      "https://1000logos.net/wp-content/uploads/2017/09/Delta-Air-Lines-Logo.png",
  },

  {
    Name: "Air India",
    Image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZYtYukk0PWPPcqOeIAwY_CyDLJP690gizZg&usqp=CAU",
  },

  ,
  {
    Name: "All Nippon Airways ",
    Image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/All_Nippon_Airways_Logo.svg/2560px-All_Nippon_Airways_Logo.svg.png",
  },
  {
    Name: "Lufthansa",
    Image: "https://www.lufthansa.com/etc/designs/dcep/logo-lh-og.jpg",
  },
  {
    Name: "United Airlines",
    Image:
      "https://1000logos.net/wp-content/uploads/2017/06/United-Airlines-Logo.png",
  },
  {
    Name: "Ethihad Airways",
    Image:
      "http://t3.gstatic.com/images?q=tbn:ANd9GcRO96TSkb8Tv7BsoWd38BnmzqIuulhyMwWt_WDjCGza3OZr-qXo",
  },
  {
    Name: "Qantas Airways",
    Image: "https://1000logos.net/wp-content/uploads/2017/05/Qantas-Logo.png",
  },
];

const cityNames = [
  "Delhi",
  "New York",
  "Los Angeles",
  "London",
  "Paris",
  "Tokyo",
  "Sydney",
  "Berlin",
  "Toronto",
  "Mumbai",
  "Rome",
  "Dubai",
  // Add more city names here
];






function getRandomCity() {
  const randomIndex = Math.floor(Math.random() * cityNames.length);
  return cityNames[randomIndex];
}

function generateRandomFlightNumber(airlineName) {
  const airlineCode = airlineName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const randomDigits = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  const flightNumber = `${airlineCode} ${randomDigits}`;
  return flightNumber;
}

function calculateStatusForDeparture(scheduledTime, now) {
  const minutesDifference = Math.floor((scheduledTime - now) / 60000); // Calculate the difference in minutes
  if (minutesDifference < 0) {
    return "Departed"; // If the flight is scheduled in the past, consider it as departed
  } else if (minutesDifference < 15) {
    return "On Time";
  } else if (minutesDifference >= 15 && minutesDifference < 60) {
    return "Boarding";
  } else {
    return "Check In Open";
  }
}

function calculateStatusForArrival(scheduledTime, now) {
  const minutesDifference = Math.floor((scheduledTime - now) / 60000); // Calculate the difference in minutes
  if (minutesDifference < 0) {
    return "Arrived"; // If the flight is scheduled in the past, consider it as arrived
  } else if (minutesDifference < 15) {
    return "On Time";
  } else if (minutesDifference >= 15 && minutesDifference < 60) {
    return "Delayed";
  } else {
    return "Scheduled";
  }
}

function generateRandomFlightArrival() {
  const shuffledAirlines = airlines.sort(() => Math.random() - 0.5);
  const flights = [];
 
  for (let i = 0; i < Math.min(10, shuffledAirlines.length); i++) {
    const randomAirline = shuffledAirlines[i];
    
    const now = DateTime.local(); // Get the current local time
    const scheduledTime = now.plus({ minutes: Math.floor(Math.random() * 180) }); // Generate a random scheduled time within the next 3 hours
    flights.push({
      
      flightName: randomAirline.Name,
      flightNumber: generateRandomFlightNumber(randomAirline.Name),
      image: randomAirline.Image,
      carrier: randomAirline.Name,
      origin: getRandomCity(),
      via: "-",
      time: scheduledTime.toFormat("HH:mm"), // Generate a time based on the scheduled time        terminal: Math.floor(Math.random() * 3) + 1,
      terminal: Math.floor(Math.random() * 3) + 1,
      belt: Math.floor(Math.random() * 15) + 1,
      status: calculateStatusForArrival(now, scheduledTime),
    });
  }

  return flights;
}

function generateRandomFlightDeparture() {
  const shuffledAirlines = airlines.sort(() => Math.random() - 0.5);
  const flights = [];

  for (let i = 0; i < Math.min(10, shuffledAirlines.length); i++) {
    const randomAirline = shuffledAirlines[i];

    const now = DateTime.local(); // Get the current local time

    const scheduledTime = now.plus({
      minutes: Math.floor(Math.random() * 180),
    }); // Generate a random scheduled time within the next 3 hours
    flights.push({
     
      flightName: randomAirline.Name,
      flightNumber: generateRandomFlightNumber(randomAirline.Name),
      image: randomAirline.Image,
      carrier: randomAirline.Name,
      destination: getRandomCity(),
      via: "-",
      time: scheduledTime.toFormat("HH:mm"), // Generate a time based on the scheduled time        terminal: Math.floor(Math.random() * 3) + 1,
      gate: Math.floor(Math.random() * 15) + 1,
      status: calculateStatusForDeparture(scheduledTime, now), // Calculate status based on scheduled and current local time
    });
  }

  return flights;
}

app.get("/api/flightsDeparture", async function (req, res) {

  const userId =req.ip
  
  

  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

  // Check if we already have data generated within the last 30 minutes for this user
  const recentData = await flightDepartureModel.find({
    user:userId,
    createdAt: { $gte: thirtyMinutesAgo }
  });

  

  if (recentData && recentData.length > 0) {
    // If we have recent data, return that
    console.log("recentData has sent ")
    return res.status(200).json(recentData);
  }

  // If not, generate new data
  const flights = generateRandomFlightDeparture();


  

  const dbData ={
    user:userId,
    data:flights
  }

  const dbEntry = await flightDepartureModel.create(dbData);
  if (!dbEntry) {
    return res
      .status(400)
      .json({ success: true, message: `error in data creation` });
  }

  res.status(200).json(dbEntry);
});



app.get("/api/flightsArrival", async function (req, res) {


  const userId =req.ip
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

  // Check if we already have data generated within the last 30 minutes for this user
  const recentData = await flightArrivalModel.find({
    user:userId,
    createdAt: { $gte: thirtyMinutesAgo }
  });

  

  if (recentData && recentData.length > 0) {
    // If we have recent data, return that
    console.log("recentData has sent ")
    return res.status(200).json(recentData);
  }

  // If not, generate new data
  const flights = generateRandomFlightArrival();


  

  const dbData ={
    user:userId,
    data:flights
  }

  const dbEntry = await flightArrivalModel.create(dbData);
  if (!dbEntry) {
    return res
      .status(400)
      .json({ success: true, message: `error in data creation` });
  }

  res.status(200).json(dbEntry);
});

app.listen(port, function () {
  console.log("Server is running on port " + port);
});
