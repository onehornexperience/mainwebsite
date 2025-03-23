import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// Initialize Supabase client with fallback to demo mode if env vars are not set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a demo mode function that simulates Supabase functionality
const createDemoClient = () => ({
  channel: () => ({
    on: () => ({
      subscribe: () => {}
    })
  }),
  removeChannel: () => {}
});

// Use demo client if Supabase credentials are not available
const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createDemoClient();

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: string;
}

interface ChatContextType {
  isOpen: boolean;
  messages: Message[];
  toggleChat: () => void;
  sendMessage: (content: string) => void;
  closeChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId] = useState(() => uuidv4());

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when chat is first opened
      setMessages([
        {
          id: uuidv4(),
          content: "Welcome to One Horn Experience! How can we help you today?",
          sender: 'agent',
          timestamp: new Date().toISOString()
        }
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Running chat in demo mode - Supabase credentials not configured');
      return;
    }

    const channel = supabase
      .channel(`chat:${sessionId}`)
      .on('broadcast', { event: 'message' }, ({ payload }) => {
        setMessages(prev => [...prev, payload]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  const toggleChat = () => setIsOpen(!isOpen);
  const closeChat = () => setIsOpen(false);

  const sendMessage = async (content: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate agent response after a short delay
    setTimeout(() => {
      const agentResponse: Message = {
        id: uuidv4(),
        content: "Thank you for your message. One of our event specialists will be with you shortly. In the meantime, feel free to browse our packages or check out our portfolio.",
        sender: 'agent',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  return (
    <ChatContext.Provider value={{ isOpen, messages, toggleChat, sendMessage, closeChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};