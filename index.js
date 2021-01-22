const express = require('express');
const app = express();
const path = require('path');
const allData = require('./data.json');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/rand', (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render('random', { num });
});

app.get('/cats', (req, res) => {
  const cats = ['blue', 'rocket', 'monty', 'stephanie', 'winston'];
  res.render('cats', { allcats: cats });
});

app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params;
  const data = allData[subreddit.toLowerCase()];
  if (data) {
    res.render('subreddit', { ...data });
  } else {
    res.render('notfound', { subreddit });
  }
});

app.listen('3000', () => {
  console.log('Listening port 3000');
});
