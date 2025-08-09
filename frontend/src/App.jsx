import React, { useState } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';

export default function App() {
  const isMobile = useMediaQuery('(max-width:750px)');
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const handleBack = () => {
    setSelectedChat(null);
  };

  return (
    <Box
      sx={{
        height: '97vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      {/* Mobile View: Only show Sidebar or Chat */}
      {
        isMobile ? (
          <>
            {!selectedChat && (
              <Box sx={{ flex: 1 }}>
                <Sidebar onSelectChat={handleChatSelect} selectedChat={selectedChat} />
              </Box>
            )}
            {selectedChat && (
              <Box sx={{ flex: 1 }}>
                <ChatWindow chat={selectedChat} onBack={handleBack} />
              </Box>
            )}
          </>
        ) : (
          // Desktop / Tablet View: Split layout
          <>
            <Box
              sx={{
                width: isMobile ? "100%" : "50%",
                borderRight: '1px solid #ccc',
                overflowY: 'auto',
              }}
            >
              <Sidebar onSelectChat={handleChatSelect} selectedChat={selectedChat} />
            </Box>
            <Box sx={{ width: isMobile ? "100%" : "70%" }}>
              {selectedChat ? (
                <ChatWindow chat={selectedChat} />
              ) : (
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#888',
                  }}
                >
                  <img src="/cat.png"
                    style={{ width: '30%' }}></img>
                  Select a chat to start messaging
                  <Typography variant="h6" sx={{ mt: 2 ,fontSize: '0.8rem', display: 'flex',justifyContent: 'center', alignItems: 'center', gap: 0.5}}>
                        <img src="/lock.png" width={'16px'}/>
                        Your personal messages are end-to-end encrypted
                  </Typography>
                </Box>
              )}
            </Box>
          </>
        )
      }
    </Box>
  );
}
