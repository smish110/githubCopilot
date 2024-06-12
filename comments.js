// Create web server 
// Create a web server
// Load the comments from the file
// Add a new comment to the file
// Respond with the comments
// Respond with the comments

// Load the comments from the file
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'comments.json');

// Create web server
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    // Read the comments from the file
    fs.readFile(commentsPath, 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('An error occurred');
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(data);
    });
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      // Read the comments from the file
      fs.readFile(commentsPath, 'utf8', (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end('An error occurred');
          return;
        }
        const comments = JSON.parse(data);
        const comment = JSON.parse(body);
        comments.push(comment);
        // Add a new comment to the file
        fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
          if (err) {
            res.statusCode = 500;
            res.end('An error occurred');
            return;
          }
          res.end('Comment added');
        });
      });
    });
  } else {
    res.statusCode = 405;
    res.end('Method not allowed');
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

//