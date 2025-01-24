import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const totalExams = 17; // Total number of exams

  const handleExamClick = (examId) => {
    navigate(`/exam/${examId}`); // Redirect to the exam page
  };

  return (
    <div className="home-page">
      <h1>Select an Exam</h1>
      <div className="exam-grid">
        {Array.from({ length: totalExams }, (_, index) => (
          <div
            key={index + 1}
            className="exam-square"
            onClick={() => handleExamClick(index + 1)}
          >
            Exam {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;