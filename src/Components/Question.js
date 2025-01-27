import React from 'react';
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Question = ({ question, options, selectedOption, onAnswer }) => {
  return (
    <Card className="mt-4" style={{ backgroundColor: '#f8f9fa', border: 'none' }}>
      <Card.Body>
        <Card.Title style={{ color: '#333', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
          {question}
        </Card.Title>
        <div className="d-grid gap-2">
          {options.map((option, index) => (
            <Button
              key={index}
              variant={selectedOption === option ? 'primary' : 'light'}
              size="lg"
              onClick={() => onAnswer(option)}
              style={{
                textAlign: 'left',
                padding: '1rem',
                backgroundColor: selectedOption === option ? '#007bff' : '#fff',
                color: selectedOption === option ? '#fff' : '#333',
                border: '1px solid #ddd',
                borderRadius: '8px',
                transition: 'background-color 0.3s, color 0.3s',
              }}
            >
              {option}
            </Button>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Question;