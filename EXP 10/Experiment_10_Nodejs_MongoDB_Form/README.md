# Experiment 10: HTML Form Request Handling using Node.js and MongoDB

**Course:** 23CS2029 – Web Technology Lab  
**Student Register Number:** URK24CS1163  

---

## 📌 Aim
To develop a server-side application using Node.js to handle HTML form submissions, validate user registration details, store the submitted data in MongoDB, and retrieve and display the details in a table format.

---

## 🚀 How to Run Locally

```bash
# 1. Navigate to the project directory
cd Experiment_10_Nodejs_MongoDB_Form

# 2. Install MongoDB driver
npm install

# 3. Ensure MongoDB daemon is running locally
# mongod or net start MongoDB

# 4. Start the Node.js server
npm start
# or: node app.js
```

1. Open your browser at:
   `http://localhost:7000/`
2. Fill out the registration form with your credentials (`URK24CS1163`).
3. Click **Register Now** (submits to `http://localhost:7000/server`).
4. View the inserted record details displayed in the formatted table.
5. In mongosh / MongoDB Compass:
   ```javascript
   use tourismDB;
   db.tourists.find();
   ```
