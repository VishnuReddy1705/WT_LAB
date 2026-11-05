// =============================================================================
// Course: 23CS2029 – Web Technology Lab
// Register Number: URK24CS1163
// Ex. No. 09: Student Practice Problem
// =============================================================================

// Switch to collegeDB
use collegeDB;

// Create collection
db.createCollection("students");

// 1. Insert at least 10 student documents
db.students.insertMany([
  { rollno: 201, name: "Arun", department: "CSE", year: 3, marks: 85, city: "Chennai" },
  { rollno: 202, name: "Priya", department: "ECE", year: 3, marks: 92, city: "Coimbatore" },
  { rollno: 203, name: "Karthik", department: "CSE", year: 2, marks: 78, city: "Salem" },
  { rollno: 204, name: "Meena", department: "EEE", year: 3, marks: 88, city: "Madurai" },
  { rollno: 205, name: "Rahul", department: "CSE", year: 4, marks: 67, city: "Trichy" },
  { rollno: 206, name: "Divya", department: "ECE", year: 2, marks: 81, city: "Chennai" },
  { rollno: 207, name: "Vijay", department: "IT", year: 3, marks: 75, city: "Erode" },
  { rollno: 208, name: "Anitha", department: "CSE", year: 3, marks: 95, city: "Coimbatore" },
  { rollno: 209, name: "Santhosh", department: "EEE", year: 4, marks: 72, city: "Salem" },
  { rollno: 210, name: "Kavya", department: "ECE", year: 3, marks: 89, city: "Madurai" }
]);

// 2. Display all students
db.students.find();

// 3. Display students belonging to CSE
db.students.find({ department: "CSE" });

// 4. Find students having marks greater than 80
db.students.find({ marks: { $gt: 80 } });

// 5. Display only student name and marks
db.students.find({}, { name: 1, marks: 1, _id: 0 });

// 6. Find students belonging to CSE and third year
db.students.find({ department: "CSE", year: 3 });

// 7. Find students belonging to CSE or ECE
db.students.find({
  $or: [
    { department: "CSE" },
    { department: "ECE" }
  ]
});

// 8. Sort students based on marks:
// Ascending order
db.students.find().sort({ marks: 1 });

// Descending order
db.students.find().sort({ marks: -1 });

// 9. Display the top three students based on marks
db.students.find().sort({ marks: -1 }).limit(3);

// 10. Count the number of CSE students
db.students.countDocuments({ department: "CSE" });

// 11. Update the marks of one student
db.students.updateOne(
  { rollno: 201 },
  { $set: { marks: 90 } }
);

// 12. Add a status field to all CSE students
db.students.updateMany(
  { department: "CSE" },
  { $set: { status: "Active" } }
);

// 13. Delete a student using roll number
db.students.deleteOne({ rollno: 210 });

// 14. Display the distinct departments
db.students.distinct("department");

// 15. Calculate department-wise average marks
db.students.aggregate([
  {
    $group: {
      _id: "$department",
      averageMarks: { $avg: "$marks" }
    }
  }
]);
