const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://dbuser:dbpassword123@nayakashu-mongodb-atlas-cluster-lpntz.mongodb.net/mean-stack-app-udemy-max-db?retryWrites=true', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongodb Atlas!');
  })
  .catch(() => {
    console.log('Connection to Mongodb Atlas failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// To allow CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/posts', (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts', (req, res) => {
  const posts = [
    { id: 'tugcsi123',
      title: 'First server-side post',
      content: 'This is coming from the server'
    },
    { id: 'skhaga123',
      title: 'Second server-side post',
      content: 'This is coming from the server too!'
    }
  ];

  res.status(200).json({
    message: 'Posts fetched successfully!',
    posts: posts
  });
});

module.exports = app;
