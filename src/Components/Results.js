import React from 'react';

const Results = ({ questions, userAnswers, onRestart }) => {
  // Check if questions or userAnswers are undefined or empty
  if (!questions || questions.length === 0 || !userAnswers || userAnswers.length === 0) {
    return <div>No results to display.</div>;
  }

  const correctAnswers = questions.filter(
    (q, index) => q.correctAnswer === userAnswers[index]
  ).length;

  const isPassed = correctAnswers >= 25;

  return (
    <div className="results">
      <h2>النتيجه</h2>
      <p>
        نتيجتك {correctAnswers} من {questions.length}
      </p>
      <p>{isPassed ? 'Congratulations! You passed!' : 'الله لا يعطيك اياها العافيه '}</p>
      <h3>راجع اخطائك بتركيز</h3>
      <div className="review-section">
        {questions.map((q, index) => {
          const userAnswer = userAnswers[index];
          const isCorrect = q.correctAnswer === userAnswer;

          if (!isCorrect) {
            return (
              <div key={index} className="review-item">
                <p><strong>Question {index + 1}:</strong> {q.question}</p>
                <p style={{ color: 'red' }}>
                  <strong>اجابتك:</strong> {userAnswer || 'Not answered'}
                </p>
                <p style={{ color: 'green' }}>
                  <strong>الاجابه الصحيحه:</strong> {q.correctAnswer}
                </p>
              </div>
            );
          }
          return null;
        })}
      </div>
      <button onClick={onRestart}>اعاده الامتحان</button>
    </div>
  );
};

export default Results;