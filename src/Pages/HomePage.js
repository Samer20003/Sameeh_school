import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import HomeNavbar from '../Components/Navbar';
const HomePage = () => {
  const navigate = useNavigate();
  const totalExams = 16; // Total number of exams

  const handleExamClick = (examId) => {
    navigate(`/exam/${examId}`); // Redirect to the exam page
  };

  return (
    <div className="home-page">
      <HomeNavbar />
      <h1>اختار امتحان</h1>
      <div className="exam-grid">
        {Array.from({ length: totalExams }, (_, index) => (
          <div
            key={index + 1}
            className="exam-square"
            onClick={() => handleExamClick(index + 1)}
          >
            امتحان {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;