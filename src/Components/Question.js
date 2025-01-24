import React from 'react';

const Question = ({ question, options, selectedOption, onAnswer }) => {
  return (
    <div className="question">
      <h3>{question}</h3>
      {options.map((option, index) => (
        <div key={index} className="option">
          <label>
            <input
              type="radio"
              name="option"
              value={option}
              checked={selectedOption === option}
              onChange={() => onAnswer(option)}
            />
            <span>{option}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default Question;