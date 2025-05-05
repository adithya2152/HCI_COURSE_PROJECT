import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, X, Paperclip } from 'lucide-react';
import Button from '../ui/Button';
import { useChat } from '../../context/ChatContext';

// Implementing a chat UI with accessibility and feedback principles
const ChatInterface: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { messages, addMessage, clearMessages } = useChat();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle message submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Simulating sending process with feedback
    setIsSending(true);
    
    // Add user message immediately
    addMessage({
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    });
    
    // Clear input
    setNewMessage('');

    // Focus back on input for better UX
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
    
    // Simulate bot response with typing indicator and delay
    setTimeout(() => {
      // Generate bot response based on user query
      const botResponse = generateBotResponse(newMessage);
      
      addMessage({
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      });
      
      setIsSending(false);
    }, 1500);
  };

  // Simple bot response generation
  const generateBotResponse = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    
    if (lowercaseQuery.includes('hello') || lowercaseQuery.includes('hi')) {
      return "Hello! I'm your learning and career assistant. How can I help you today?";
    } 
    else if (lowercaseQuery.includes('help') || lowercaseQuery.includes('support')) {
      return "I can help you with learning recommendations, career path suggestions, skill assessments, and more. What specifically would you like assistance with?";
    }
    else if (lowercaseQuery.includes('course') || lowercaseQuery.includes('learn') || lowercaseQuery.includes('study')) {
      return "Based on your profile, I'd recommend courses in data science, UX design, or web development. Would you like more specific recommendations in any of these areas?";
    }
    else if (lowercaseQuery.includes('job') || lowercaseQuery.includes('career') || lowercaseQuery.includes('work')) {
      return "With your current skills, you might consider roles in product management, UX/UI design, or frontend development. Would you like more information about any of these career paths?";
    }
    else if (lowercaseQuery.includes('skill') || lowercaseQuery.includes('ability')) {
      return "Your current skill assessment shows strengths in problem-solving and design thinking. Developing technical skills like programming or data analysis could open up more opportunities for you.";
    }
    else {
      return "That's an interesting question. To give you the best guidance, could you provide more details about what you're looking to achieve with your learning or career goals?";
    }
  };

  // Handle textarea height adjustment
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
    
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Handle keyboard shortcuts (Shneiderman's shortcuts principle)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-[600px] rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Chat header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Bot className="h-6 w-6 text-primary-600" />
          <h2 className="text-lg font-semibold">AI Learning Assistant</h2>
        </div>
        <button
          onClick={clearMessages}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Clear chat"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Welcome message */}
        {messages.length === 0 && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 bg-primary-100 rounded-full p-2">
              <Bot className="h-5 w-5 text-primary-600" />
            </div>
            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
              <p className="text-gray-800">
                Hi there! I'm your learning and career assistant. Ask me anything about courses, 
                career paths, or skill development, and I'll provide personalized recommendations.
              </p>
            </div>
          </div>
        )}
        
        {/* Chat messages */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.sender === 'bot' && (
              <div className="flex-shrink-0 bg-primary-100 rounded-full p-2">
                <Bot className="h-5 w-5 text-primary-600" />
              </div>
            )}
            
            <div 
              className={`rounded-lg p-3 max-w-[80%] ${
                message.sender === 'user' 
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p>{message.content}</p>
              <span className="text-xs opacity-70 block mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
            
            {message.sender === 'user' && (
              <div className="flex-shrink-0 bg-primary-600 rounded-full p-2">
                <User className="h-5 w-5 text-white" />
              </div>
            )}
          </div>
        ))}
        
        {/* Typing indicator */}
        {isSending && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 bg-primary-100 rounded-full p-2">
              <Bot className="h-5 w-5 text-primary-600" />
            </div>
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '600ms' }} />
              </div>
            </div>
          </div>
        )}
        
        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-end space-x-2">
          <div className="flex-grow relative">
            <textarea
              ref={inputRef}
              value={newMessage}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none overflow-hidden"
              placeholder="Type your message..."
              rows={1}
              style={{ maxHeight: '120px' }}
            />
            <button
              type="button"
              className="absolute bottom-2 right-2 text-gray-400 hover:text-gray-600"
              aria-label="Attach file"
            >
              <Paperclip className="h-5 w-5" />
            </button>
          </div>
          <Button
            type="submit"
            disabled={!newMessage.trim() || isSending}
            className="p-2.5 rounded-full"
            aria-label="Send message"
            icon={<Send className="h-5 w-5" />}
          />
        </div>
        
        {/* Keyboard shortcut hint - helping users learn */}
        <div className="mt-2 text-xs text-gray-500 text-center">
          Press Enter to send, Shift+Enter for new line
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;