const http = require('http');
const mysql = require('mysql');

// MySQL setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kkalra@2712',
  database: 'testdb'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
});

// Server setup
const server = http.createServer((req, res) => {
  // Route: Get data from MySQL
  if (req.url === '/api/data' && req.method === 'GET') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Database error' }));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(results));
      }
    });
  }

  // Route: Add multiple users
  else if (req.url === '/api/add' && req.method === 'GET') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    const users = [['David'], ['Emily'], ['Frank'], ['Hannah'], ['Ishaan']];
    db.query('INSERT INTO users (name) VALUES ?', [users], (err, result) => {
      if (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Insert failed' }));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: `${result.affectedRows} users added` }));
      }
    });
  }

  // Default 404 route
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

// Start server
server.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});
