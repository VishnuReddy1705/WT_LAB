// =============================================================================
// Course: 23CS2029 – Web Technology Lab
// Register Number: URK24CS1163
// Ex. No. 09: Working with MongoDB Using Shell Commands
// =============================================================================

// 1. Connect to mongosh:
// mongosh

// 2. View existing databases
show dbs;

// 3. Select / Create database
use collegeDB;

// 4. Check current active database
db;

// 5. Create collection
db.createCollection("students");

// 6. View collections in collegeDB
show collections;

// 7. Insert Single Document
db.students.insertOne({
  rollno: 101,
  name: "Arun",
  department: "CSE",
  year: 3,
  marks: 85
});

// 8. Insert Multiple Documents
db.students.insertMany([
  { rollno: 102, name: "Priya", department: "ECE", year: 3, marks: 92 },
  { rollno: 103, name: "Karthik", department: "CSE", year: 2, marks: 78 },
  { rollno: 104, name: "Meena", department: "EEE", year: 3, marks: 88 },
  { rollno: 105, name: "Rahul", department: "CSE", year: 4, marks: 67 }
]);

// 9. Display all documents
db.students.find();

// 10. Find single document matching filter
db.students.findOne({ rollno: 103 });

// 11. Search using condition (department = "CSE")
db.students.find({ department: "CSE" });

// 12. Comparison Operators:
// Marks greater than 80 ($gt)
db.students.find({ marks: { $gt: 80 } });

// Marks greater than or equal to 80 ($gte)
db.students.find({ marks: { $gte: 80 } });

// Marks less than 80 ($lt)
db.students.find({ marks: { $lt: 80 } });

// Marks less than or equal to 80 ($lte)
db.students.find({ marks: { $lte: 80 } });

// Marks not equal to 85 ($ne)
db.students.find({ marks: { $ne: 85 } });

// 13. Logical AND condition
db.students.find({
  department: "CSE",
  marks: { $gt: 75 }
});

// 14. Logical OR condition
db.students.find({
  $or: [
    { department: "CSE" },
    { department: "ECE" }
  ]
});

// 15. Field Projection (1 = include, 0 = exclude)
db.students.find(
  {},
  { name: 1, marks: 1, _id: 0 }
);

// 16. Sort Documents (1 for ascending, -1 for descending)
db.students.find().sort({ marks: 1 });
db.students.find().sort({ marks: -1 });

// 17. Limit Results (Top 3 highest marks)
db.students.find().sort({ marks: -1 }).limit(3);

// 18. Count Documents
db.students.countDocuments({});
db.students.countDocuments({ department: "CSE" });

// 19. Update One Document
db.students.updateOne(
  { rollno: 101 },
  { $set: { marks: 90 } }
);

// 20. Update Multiple Documents
db.students.updateMany(
  { department: "CSE" },
  { $set: { status: "Active" } }
);

// 21. Increment Numeric Value ($inc)
db.students.updateOne(
  { rollno: 103 },
  { $inc: { marks: 5 } }
);

// 22. Delete One Document
db.students.deleteOne({ rollno: 105 });

// 23. Delete Multiple Documents
db.students.deleteMany({ marks: { $lt: 70 } });

// 24. Distinct Values
db.students.distinct("department");

// 25. Simple Aggregation: Average marks department-wise
db.students.aggregate([
  {
    $group: {
      _id: "$department",
      averageMarks: { $avg: "$marks" }
    }
  }
]);

// 26. Aggregation: Find Maximum Marks
db.students.aggregate([
  {
    $group: {
      _id: null,
      maximumMarks: { $max: "$marks" }
    }
  }
]);

// 27. Aggregation: Department-wise Number of Students
db.students.aggregate([
  {
    $group: {
      _id: "$department",
      totalStudents: { $sum: 1 }
    }
  }
]);

// 28. Indexing
db.students.createIndex({ rollno: 1 });
db.students.getIndexes();

// 29. Shell Help
// db.students.help();
// db.students.insertOne.help();

// 30. Clean Up (Execute only at the end)
// db.students.drop();
// db.dropDatabase();
