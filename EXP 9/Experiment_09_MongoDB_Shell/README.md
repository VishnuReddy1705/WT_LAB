# Experiment 09: Working with MongoDB Using Shell Commands

**Course:** 23CS2029 – Web Technology Lab  
**Student Register Number:** URK24CS1163  

---

## 📌 Aim
To study MongoDB and perform basic database operations using MongoDB Shell (`mongosh`), including database and collection creation, document insertion, retrieval, filtering, sorting, updating, deletion, indexing, and simple aggregation.

---

## 🗄️ Relational vs MongoDB Terminology Mapping
| Relational Database | MongoDB |
|---|---|
| Database | Database |
| Table | Collection |
| Row | Document |
| Column | Field |
| Primary Key | `_id` |

---

## 🚀 How to Execute
1. Open terminal and launch MongoDB Shell:
   ```bash
   mongosh
   ```
2. Run queries interactively or load the script:
   ```javascript
   load("practice_problem.js")
   ```

---

## 📋 Operations Covered
1. **Database & Collection Lifecycle:** `show dbs`, `use collegeDB`, `db.createCollection("students")`, `show collections`, `db.students.drop()`, `db.dropDatabase()`
2. **CRUD Operations:**
   - Create: `insertOne()`, `insertMany()`
   - Read: `find()`, `findOne()`, query filters
   - Update: `updateOne()`, `updateMany()`, `$set`, `$inc`
   - Delete: `deleteOne()`, `deleteMany()`
3. **Query Operators:**
   - Comparison: `$gt`, `$gte`, `$lt`, `$lte`, `$ne`, `$in`, `$nin`
   - Logical: `$and`, `$or`
4. **Projections, Sorting & Pagination:** `find({}, {name: 1, marks: 1, _id: 0})`, `.sort({marks: -1})`, `.limit(3)`
5. **Aggregation Pipeline & Utilities:** `$group`, `$avg`, `$max`, `$sum`, `distinct()`, `createIndex()`, `getIndexes()`
