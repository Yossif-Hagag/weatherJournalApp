// Setup empty JS object to act as endpoint for all routes
projectData = [];
// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port = 3333;
app.listen(port , ()=>{console.log(`server is run on port ${port}`)});
//Routes
app.post('/data', (req, res)=>{
	projectData.push(req.body);
});
app.get('/all', function (req, res) {
  res.send(projectData)
});