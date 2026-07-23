import React from 'react';
import '../Stylesheets/mystyle.css';

function CalculateScore({ Name, School, Total, Goal }) {
  const Average = Total / Goal;

  return React.createElement(
    'div',
    { className: 'container' },
    React.createElement(
      'div',
      { className: 'student-card' },
      React.createElement('h1', { className: 'heading' }, 'Student Details'),
      React.createElement('div', { className: 'row' },
        React.createElement('span', { className: 'label' }, 'Name :'),
        React.createElement('span', { className: 'value' }, Name)
      ),
      React.createElement('div', { className: 'row' },
        React.createElement('span', { className: 'label' }, 'School :'),
        React.createElement('span', { className: 'value' }, School)
      ),
      React.createElement('div', { className: 'row' },
        React.createElement('span', { className: 'label' }, 'Total Marks :'),
        React.createElement('span', { className: 'value' }, Total)
      ),
      React.createElement('div', { className: 'row' },
        React.createElement('span', { className: 'label' }, 'Goal :'),
        React.createElement('span', { className: 'value' }, Goal)
      ),
      React.createElement('div', { className: 'row' },
        React.createElement('span', { className: 'label' }, 'Average Score :'),
        React.createElement('span', { className: 'value' }, Average)
      )
    )
  );
}

export default CalculateScore;
