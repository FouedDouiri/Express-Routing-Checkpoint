
const express = require('express');
const app = express();
const port = 3000;

const workingHoursMiddleware = (req, res, next) => {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const currentHour = currentDate.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && currentHour >= 9 && currentHour < 17) {
   
    next();
  } else {
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};


app.use(workingHoursMiddleware);


app.set('view engine', 'ejs');


app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
