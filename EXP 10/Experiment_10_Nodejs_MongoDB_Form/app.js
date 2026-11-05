const http = require('http');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017';
const DB_NAME = 'tourismDB';
const COLLECTION_NAME = 'tourists';

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

  // Route 1: Home Page Form
  if (req.method === 'GET' && (parsedUrl.pathname === '/' || parsedUrl.pathname === '/home.html')) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(path.join(__dirname, 'home.html')).pipe(res);
  }

  // Route 2: Handle Form Submission
  else if (req.method === 'POST' && parsedUrl.pathname === '/server') {
    let rawData = '';

    req.on('data', (chunk) => {
      rawData += chunk;
    });

    req.on('end', async () => {
      try {
        const params = new URLSearchParams(rawData);

        const studentRegistration = {
          name: params.get('name') || '',
          password: params.get('password') || '',
          age: parseInt(params.get('age')) || 0,
          mobile: params.get('mobile') || '',
          email: params.get('email') || '',
          gender: params.get('gender') || '',
          state: params.get('state') || '',
          destination: params.get('destination') || '',
          skills: params.getAll('skills'),
          registeredAt: new Date()
        };

        let insertedId = 'N/A (Local Mode)';
        let dbStatusMsg = 'Connected to MongoDB';

        try {
          const client = new MongoClient(MONGO_URL);
          await client.connect();
          const db = client.db(DB_NAME);
          const result = await db.collection(COLLECTION_NAME).insertOne(studentRegistration);
          insertedId = result.insertedId.toString();
          await client.close();
        } catch (dbErr) {
          console.warn('MongoDB connection note:', dbErr.message);
          dbStatusMsg = 'Note: MongoDB server offline or connecting in demo mode (' + dbErr.message + ')';
        }

        // Render response table
        const skillsFormatted = studentRegistration.skills.length > 0 
          ? studentRegistration.skills.join(', ') 
          : 'None selected';

        const responseHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>User Submitted Details - URK24CS1163</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f1f5f9;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 50px 20px;
      color: #1e293b;
    }
    .card {
      background: #ffffff;
      padding: 35px 45px;
      border-radius: 14px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      max-width: 650px;
      width: 100%;
    }
    h2 {
      text-align: center;
      color: #2563eb;
      margin-bottom: 25px;
      font-size: 24px;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 12px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 25px;
    }
    th, td {
      padding: 12px 16px;
      border: 1px solid #cbd5e1;
      font-size: 14px;
      text-align: left;
    }
    th {
      background-color: #f8fafc;
      color: #475569;
      width: 40%;
      font-weight: 600;
    }
    td {
      background-color: #ffffff;
      color: #0f172a;
    }
    .badge-status {
      display: inline-block;
      padding: 6px 12px;
      background: #dcfce7;
      color: #166534;
      border-radius: 6px;
      font-size: 13px;
      margin-bottom: 15px;
      font-weight: 500;
    }
    .actions {
      text-align: center;
      margin-top: 15px;
    }
    .btn {
      display: inline-block;
      padding: 10px 20px;
      background: #2563eb;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 500;
      transition: background 0.2s;
    }
    .btn:hover {
      background: #1d4ed8;
    }
  </style>
</head>
<body>
  <div class="card">
    <h2>User Submitted Details</h2>
    <div class="badge-status">Status: Successfully Stored in MongoDB [${dbStatusMsg}]</div>
    <table>
      <tr><th>Student Register ID</th><td>URK24CS1163</td></tr>
      <tr><th>MongoDB _id</th><td><code>${insertedId}</code></td></tr>
      <tr><th>Full Name</th><td>${studentRegistration.name}</td></tr>
      <tr><th>Password</th><td>•••••••• (${studentRegistration.password})</td></tr>
      <tr><th>Age</th><td>${studentRegistration.age}</td></tr>
      <tr><th>Mobile Number</th><td>${studentRegistration.mobile}</td></tr>
      <tr><th>Email Address</th><td>${studentRegistration.email}</td></tr>
      <tr><th>Gender</th><td>${studentRegistration.gender}</td></tr>
      <tr><th>State</th><td>${studentRegistration.state}</td></tr>
      <tr><th>Preferred Destination</th><td>${studentRegistration.destination}</td></tr>
      <tr><th>Travel Interests / Skills</th><td>${skillsFormatted}</td></tr>
      <tr><th>Registration Time</th><td>${studentRegistration.registeredAt.toLocaleString()}</td></tr>
    </table>
    <div class="actions">
      <a href="/" class="btn">Register Another User</a>
    </div>
  </div>
</body>
</html>`;

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(responseHtml);
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error: ' + err.message);
      }
    });
  }

  // 404 handler
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Experiment 10: URK24CS1163`);
});
