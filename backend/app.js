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

// Get all posts
app.get('/api/posts', (req, res) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: documents
      });
    });
});

// Add a post
app.post('/api/posts', (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save()
    .then(createdPost => {
      res.status(201).json({
        message: 'Post added successfully',
        postId: createdPost._id
      });
    });
});

// Delete a post
app.delete('/api/posts/:id', (req, res) => {
  Post.deleteOne({ _id: req.params.id })
    .then(result => {
      console.log(result);
      res.status(200).json({ message: 'Post deleted!' });
    });
});

module.exports = app;
