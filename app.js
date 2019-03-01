const express = require('express');
const path = require('path');
const faker = require('faker');
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/fake', (req, res) => {
  const sentenceNumber = req.query.sentences;
  const sentences = faker.lorem.sentences(sentenceNumber);
  res.render('sentences', {
    sentences
  });
});

app.get('/pdf', (req, res) => {
  const names = [];
  const namesNumber = req.query.names;
  for (let i = 0; i < namesNumber; i++) {
    const firstName = faker.name.firstName();
    const lastName= faker.name.lastName();
    const email = `${firstName}.${lastName}@gmail.com`.toLowerCase();
    const phoneNumber = faker.phone.phoneNumberFormat(1);
    names.push({ firstName, lastName, email, phoneNumber });
  }
  res.send(names);
})

app.listen(8000);