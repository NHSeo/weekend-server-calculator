const express = require('express');
const app = express();
let PORT = process.env.PORT || 5006;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = []


// Here's a wonderful place to make some routes:

// GET /calculations
app.get('/calculations', (req, res) => {
  res.json(calculations);
})

// POST /calculations
app.post('/calculations', (req, res) => {
  const { numOne, numTwo, operator } = req.body;
  let result;

  if (typeof numOne !== 'number' || typeof numTwo !== 'number') {
    return res.status(400).send('Invalid input.');
  }

  switch (operator) {
    case '+':
      result = numOne + numTwo;
      break;
    case '-':
      result = numOne - numTwo;
      break;
    case '*':
      result = numOne * numTwo;
      break;
    case '/':
      result = numTwo !== 0 ? numOne / numTwo : 'Error';
      break;
    default:
      return res.status(400).send('Invalid');
  }

  const calculation = { numOne, numTwo, operator, result };
  calculations.push(calculation);

  res.status(201).json(calculation);
});

// Delete for stretch goal
app.delete('/calculations', (req, res) => {
  calculations = [];
  res.status(200).send('Removed all.');
});

// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
