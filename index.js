const express = require('express');
const Chance = require('chance');

const app = express();
const port = 3000;

const chance = new Chance();

// Generate random flight data for UAE airport
function generateRandomFlight() {
    return {
        flightNumber: chance.string({ pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', length: 6 }),
        airline: chance.company(),
        destination: chance.city(),
        departureTime: chance.hour({ twentyfour: true }) + ':' + chance.minute(),
        gate: chance.integer({ min: 1, max: 10 }),
    };
}

// Define a route to get random flight data
app.get('/api/flights', (req, res) => {
    const numberOfFlights = chance.integer({ min: 5, max: 10 });
    const flights = Array.from({ length: numberOfFlights }, generateRandomFlight);
    res.json(flights);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
