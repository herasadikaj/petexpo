const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;


app.use(express.static(__dirname));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'homepage.html'));
});

app.get('/cats', async (req, res) => {
  try {
    const response = await axios.get('https://freetestapi.com/api/v1/cats');
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from API');
  }
});

app.get('/dogs', async (req, res) => {
  try {
    const response = await axios.get('https://freetestapi.com/api/v1/dogs');
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from API');
  }
});

app.get('/birds', async (req, res) => {
  try {
    const response = await axios.get('https://freetestapi.com/api/v1/birds');
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from API');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
