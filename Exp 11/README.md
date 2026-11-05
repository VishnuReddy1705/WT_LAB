# Ex. No. 11: Database Integration in NodeJS Application using MongoDB

## Aim
To develop a NodeJS application that connects to a MongoDB database and performs basic database operations such as Create, Read, Update and Delete (CRUD).

---

## Software Requirements
- Node.js & npm
- Express.js
- MongoDB & MongoDB Compass
- Mongoose
- Visual Studio Code
- Web browser / Postman

---

## Installation & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   node app.js
   ```
   *(Or with nodemon: `npx nodemon app.js`)*

3. **Server running on:** `http://localhost:3000`
4. **Interactive Browser Tester:** Open `http://localhost:3000` in any web browser.

---

## REST API Endpoints & CRUD Operations

| Operation | HTTP Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **CREATE** | `POST` | `/students` | Insert a new student record |
| **READ ALL** | `GET` | `/students` | Retrieve all student records |
| **READ ONE** | `GET` | `/students/:regNo` | Retrieve single student by register number |
| **UPDATE** | `PUT` | `/students/:regNo` | Update student details by register number |
| **DELETE** | `DELETE` | `/students/:regNo` | Remove student record by register number |

---

## Sample Payloads & Testing

### 1. Insert a Student (POST `/students`)
```json
{
  "regNo": "URK23CS1001",
  "name": "Arun Kumar",
  "department": "Computer Science and Engineering",
  "email": "arun@gmail.com",
  "cgpa": 8.5
}
```

### 2. View All Students (GET `/students`)
```bash
curl http://localhost:3000/students
```

### 3. View One Student (GET `/students/:regNo`)
```bash
curl http://localhost:3000/students/URK23CS1001
```

### 4. Update Student Details (PUT `/students/:regNo`)
```json
{
  "name": "Arun Kumar",
  "department": "CSE",
  "email": "arun.kumar@gmail.com",
  "cgpa": 9.0
}
```

### 5. Delete Student Record (DELETE `/students/:regNo`)
```bash
curl -X DELETE http://localhost:3000/students/URK23CS1001
```
Expected response:
```json
{
  "message": "Student deleted successfully"
}
```

---

## Database Verification
- **MongoDB Connection:** `mongodb://127.0.0.1:27017`
- **Database:** `studentdb`
- **Collection:** `students`
