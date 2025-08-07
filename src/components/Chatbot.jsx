import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Chatbot() {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // To toggle the chatbot UI
  const [selectedFile, setSelectedFile] = useState(null); // For file upload

  // Create a ref for the chat body container
  const chatBodyRef = useRef(null);

  // Function to handle sending the message
  const sendMessage = async () => {
    if (userMessage.trim() === '') return; // Prevent sending empty messages

    const newChatHistory = [...chatHistory, { sender: 'User', message: userMessage }];
    setChatHistory(newChatHistory);

    try {
      const response = await axios.post('http://localhost:5000/query', { message: userMessage });
      const assistantMessage = response.data.response || "I'm not sure how to respond to that.";
      setChatHistory([...newChatHistory, { sender: 'AI Assistant', message: assistantMessage }]);
    } catch (error) {
      console.error('Error:', error);
      setChatHistory([...newChatHistory, { sender: 'AI Assistant', message: "Sorry, there was an error." }]);
    }

    setUserMessage(''); // Clear the input field after sending
  };

  // Function to handle file upload
  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setChatHistory([
        ...chatHistory,
        { sender: 'User', message: `Uploaded: ${selectedFile.name}` },
        { sender: 'AI Assistant', message: response.data.message },
      ]);
      setSelectedFile(null); // Clear the file input after uploading
    } catch (error) {
      console.error('Error:', error);
      setChatHistory([
        ...chatHistory,
        { sender: 'User', message: `Uploaded: ${selectedFile.name}` },
        { sender: 'AI Assistant', message: "Sorry, there was an error with the file upload." },
      ]);
    }
  };

  // Function to send the welcome message when the chatbot is opened
  useEffect(() => {
    if (isOpen && chatHistory.length === 0) {
      setChatHistory([{ sender: 'AI Assistant', message: 'Welcome! How can I help you?' }]);
    }
  }, [isOpen]); // This effect runs when the chatbot UI is opened

  // Scroll to the bottom of the chat body when chatHistory changes
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <>
      {/* Chatbot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)} // Toggle Chatbot UI
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-800 text-white rounded-full shadow-lg hover:bg-blue-400 z-50 flex items-center justify-center"
      >
        💬
      </button>

      {/* Chatbot UI */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-full lg:w-[30rem] max-h-[85vh] bg-n-8 rounded-3xl shadow-lg flex flex-col overflow-hidden z-50">
          {/* Header */}
          <div className="bg-n-7 text-white px-4 py-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold">DoJ Chatbot</h3>
            <button
              onClick={() => setIsOpen(false)} // Close the chatbot
              className="text-sm"
            >
              ✕
            </button>
          </div>

          {/* Chat Body */}
          <div
            ref={chatBodyRef} // Attach the ref to the chat body container
            className="flex-1 p-4 overflow-y-auto bg-n-8"
          >
            <div className="space-y-4">
              {chatHistory.map((chat, index) => (
                <div key={index}>
                  {/* Display the sender label */}
                  <div className={`text-xs font-semibold ${chat.sender === 'User' ? 'text-blue-500 text-right' : 'text-gray-500 text-left'}`}>
                    {chat.sender === 'User' ? 'You' : 'AI Assistant'}
                  </div>
                  <div
                    className={`flex ${chat.sender === 'User' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`p-3 rounded-xl max-w-xs ${chat.sender === 'User' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                    >
                      {chat.message}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Input and Send/File Upload */}
          <div className="border-t border-gray-300 bg-n-8 p-3 flex items-center space-x-2">
            {/* Input for typing the message */}
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 text-white border border-gray-300 rounded-lg p-2"
            />

            {/* File Upload Button with Icon */}
            <label className="flex items-center cursor-pointer">
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="hidden"
              />
              {/* File upload icon (SVG similar to WhatsApp) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500 hover:text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </label>

            {/* Send button */}
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white rounded-xl px-4 py-2 hover:bg-blue-400"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
