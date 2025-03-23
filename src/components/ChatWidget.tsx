import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { useTheme } from '../context/ThemeContext';
import { format } from 'date-fns';

const ChatWidget: React.FC = () => {
  const { isOpen, messages, sendMessage, closeChat } = useChat();
  const { isDarkMode } = useTheme();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-4 right-4 w-96 max-w-[calc(100vw-2rem)] ${isDarkMode ? 'bg-dark-bg' : 'bg-white'} rounded-lg shadow-xl overflow-hidden z-50`}>
      {/* Header */}
      <div className="bg-indigo-600 p-4 flex justify-between items-center">
        <h3 className="text-white font-semibold">One Horn Experience Chat</h3>
        <button
          onClick={closeChat}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className={`h-96 overflow-y-auto p-4 ${isDarkMode ? 'bg-dark-bg-alt' : 'bg-gray-50'}`}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div
              className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : isDarkMode
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-900'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'}`}>
                {format(new Date(message.timestamp), 'HH:mm')}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className={`flex-1 px-4 py-2 rounded-md ${
              isDarkMode
                ? 'bg-dark-bg-alt text-white border-gray-700'
                : 'bg-gray-100 text-gray-900 border-gray-300'
            } border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWidget;