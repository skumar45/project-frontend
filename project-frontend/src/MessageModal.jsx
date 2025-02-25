import React, { useState } from 'react';
import Header from './Header'; 
import Footer from './Footer';
import './tokens.css';
import './index.css';
import './app.css';

function MessageInput({ message, onMessageChange }) {
  return (
    <div className="message-input">
      <label htmlFor="message">Type a Message</label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
      />
    </div>
  );
}

function SendButton({ onSend }) {
  return <button onClick={onSend}>Send</button>;
}

function WarningMessage() {
  return (
    <div className="warning-message">
      <p><strong>Warning:</strong> Please do not share any personal information.</p>
    </div>
  );
}

function App() {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    console.log(`Message sent: ${message}`);
    setMessage(''); // Clear the input after sending
  };

  return (
    <div className="message-seller-modal">
      <Header />
      <h4>Message Seller</h4>
      <MessageInput message={message} onMessageChange={setMessage} />
      <SendButton onSend={handleSendMessage} />
      <WarningMessage />
      <Footer />
    </div>
  );
}

export default App;