



const express = require("express");

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
  
  function generateRandomFlight() {
    const flights = [];
    const availableIndexes = airlines.map((_, index) => index);
  
    while (flights.length < 10 && availableIndexes.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableIndexes.length);
      const selectedIndex = availableIndexes[randomIndex];
  
      availableIndexes.splice(randomIndex, 1);
      const randomAirline = airlines[selectedIndex];
  
      flights.push({
        flightName: randomAirline.Name,
        image: randomAirline.Image,
        carrier: randomAirline.Name,
        origin: "Dubai",
        via: "-",
        time: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}`,
        terminal: Math.floor(Math.random() * 3) + 1,
        belt: Math.floor(Math.random() * 20) + 1,
        status: ["On Time", "Delayed", "Boarding"][Math.floor(Math.random() * 3)],
      });
    }
  
    return flights;
  }
app.get("/api/flightsDeparture", function(req, res) {
  const flights = generateRandomFlight();
  res.json(flights);
});

app.get("/api/flightsArrival", function(req, res) {
  const flights = generateRandomFlight();
  res.json(flights);
});

app.listen(port, function() {
  console.log("Server is running on port " + port);
});
