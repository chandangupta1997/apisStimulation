
const express = require("express");
const chance = require("chance")
const app = express();
const port = 3000;


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
      Name:"Emirates",
      Image:"https://c.ekstatic.net/ecl/logos/emirates/emirates-logo-badge.png"
  
    },
    {
      Name: "Delta AirLines",
      Image:"https://1000logos.net/wp-content/uploads/2017/09/Delta-Air-Lines-Logo.png"
    }
  
    ,
  
    {
      Name:"Air India",
      Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZYtYukk0PWPPcqOeIAwY_CyDLJP690gizZg&usqp=CAU"
    },
   
    ,
    {
      Name:"All Nippon Airways ",
      Image:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/All_Nippon_Airways_Logo.svg/2560px-All_Nippon_Airways_Logo.svg.png"
    },
    {
      Name:"Lufthansa",
      Image:"https://www.lufthansa.com/etc/designs/dcep/logo-lh-og.jpg"
    },
    {
      Name:"United Airlines",
      Image:"https://1000logos.net/wp-content/uploads/2017/06/United-Airlines-Logo.png"
  
    },
    {
      Name:"Ethihad Airways",
      Image:"http://t3.gstatic.com/images?q=tbn:ANd9GcRO96TSkb8Tv7BsoWd38BnmzqIuulhyMwWt_WDjCGza3OZr-qXo"
    },
    {
      Name:"Qantas Airways",
      Image:"https://1000logos.net/wp-content/uploads/2017/05/Qantas-Logo.png"
    }
    
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
    "Dubai"
    // Add more city names here
  ];

  function getRandomCity() {
    const randomIndex = Math.floor(Math.random() * cityNames.length);
    return cityNames[randomIndex];
  }

  function generateRandomFlightNumber(airlineName) {
    const airlineCode = airlineName
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase();
  
    const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  
    const flightNumber = `${airlineCode} ${randomDigits}`;
    return flightNumber;
  }
  
  function generateRandomFlightArrival() {
    const shuffledAirlines = airlines.sort(() => Math.random() - 0.5);
    const flights = [];
  
    for (let i = 0; i < Math.min(10, shuffledAirlines.length); i++) {
      const randomAirline = shuffledAirlines[i];
  
      flights.push({
        flightName: randomAirline.Name,
        flightNumber:generateRandomFlightNumber(randomAirline.Name),
        image: randomAirline.Image,
        carrier: randomAirline.Name,
        origin: getRandomCity(),
        via: "-",
        time: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}`,
        terminal: Math.floor(Math.random() * 3) + 1,
        belt: Math.floor(Math.random() * 15) + 1,
        status: ["On Time", "Delayed", "Boarding"][Math.floor(Math.random() * 3)],
      });
    }
  
    return flights;
  }
  

  function generateRandomFlightDeparture() {
    const shuffledAirlines = airlines.sort(() => Math.random() - 0.5);
    const flights = [];
  
    for (let i = 0; i < Math.min(10, shuffledAirlines.length); i++) {
      const randomAirline = shuffledAirlines[i];
  
      flights.push({
        flightName: randomAirline.Name,
        flightNumber:generateRandomFlightNumber(randomAirline.Name),
        image: randomAirline.Image,
        carrier: randomAirline.Name,
        destination:  getRandomCity(),
        via: "-",
        time: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}`,
        terminal: Math.floor(Math.random() * 3) + 1,
        gate: Math.floor(Math.random() * 15) + 1,
        status: ["On Time", "Delayed", "Boarding","Check In Open"][Math.floor(Math.random() * 3)],
      });
    }
  
    return flights;
  }


app.get("/api/flightsDeparture", function(req, res) {
  const flights = generateRandomFlightDeparture();
  res.json(flights);
});

app.get("/api/flightsArrival", function(req, res) {
  const flights = generateRandomFlightArrival();
  res.json(flights);
});

app.listen(port, function() {
  console.log("Server is running on port " + port);
});
