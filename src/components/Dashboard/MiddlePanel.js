import React from 'react';
import './Dashboard.css'; // Import your CSS file for styling

const Component1 = () => {
  return (
    <li className="component-box">
      <h3>Component 1</h3>
      <p>This is the content of component 1.</p>
    </li>
  );
};

const Component2 = () => {
  return (
    <li className="component-box">
      <h3>Component 2</h3>
      <p>This is the content of component 2.</p>
    </li>
  );
};

// ... Repeat similar structure for Component3, Component4, Component5

const MiddlePanel = () => {
  return (
    <div className="middle-panel">
      <ul className="component-list">
        <Component1 />
        <Component2 />
        {/* Include other Component components */}
      </ul>
    </div>
  );
};

export default MiddlePanel;