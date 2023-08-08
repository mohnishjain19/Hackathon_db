import React from 'react';
import './Dashboard.css'

const NotificationPanel = () => {
  // Sample array of messages
  const messages = [
    "Notification 1: This is the first message.",
    "Notification 2: This is the second message.",
    "Notification 3: This is the third message.",
    // Add more messages as needed
  ];

  return (
    <div className="notification-panel">
      <h3>Notifications</h3>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPanel;