import ProgressBar from "./ProgressBar";

function CourseList({ courses = [] }) {
  return (
    <section className="course-section" id="courses">
      <h2>My Courses</h2>
      {courses.length === 0 ? (
        <p className="empty-msg">No courses match your search.</p>
      ) : (
        <div className="course-list">
          {courses.map((course, index) => (
            <div className="course-item" key={course.name || index}>
              <div className="course-top">
                <span className="course-name">{course.name}</span>
                <strong className="course-percentage">{course.progress}%</strong>
              </div>
              <ProgressBar percent={course.progress} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default CourseList;
