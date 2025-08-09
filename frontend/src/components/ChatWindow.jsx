import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Divider,
    TextField,
    IconButton,
    Paper,
    Button,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Message from './Message';
import api from "../utils/axios";

export default function ChatWindow({ chat, onBack }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const allMessages = async () => {
        try {
            const response = await api.get('/get-chat-by-user', { params: { wa_id: chat._id } });
            setMessages(response.data.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }
    useEffect(() => {
        allMessages();
    }, [chat]);

    const handleSend = async() => {
        if (input.trim()) {
            try {
                const response = await api.post("/send-message", {
                    wa_id: chat._id,
                    name: chat.name,
                    from: messages[0].to,
                    to: messages[0].to,
                    timestamp: new Date().toISOString(),
                    message: input,
                    message_id: "wamid." + chat._id + new Date().getTime(),
                    status: "sent",
                })
                setMessages([...messages, response.data.data]);
                setInput('');
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        }
    };
 
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    padding: 2,
                    borderBottom: '1px solid #ccc',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                {onBack && (
                    <IconButton onClick={onBack}>
                        <ArrowBackIcon />
                    </IconButton>
                )}
                <ListItemAvatar>
                    <Avatar src={chat.src} />
                </ListItemAvatar>
                <ListItemText
                    primary={chat.name}
                    secondary={"+" + chat._id.slice(0, 2) + " " + chat._id.slice(2,12)}
                />
            </Box>

            <Divider />

            {/* Messages */}
            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    padding: 2,
                    backgroundColor: '#f0f0f0',
                }}
            >
                {messages.map((msg, index) => (
                    <Message key={index} {...msg} />
                ))}
            </Box>

            {/* Input */}
            <Paper
                elevation={2}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 1,
                    borderTop: '1px solid #ccc',
                }}
            >
                <TextField
                    fullWidth
                    placeholder="Message"
                    variant="outlined"
                    size="small"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <IconButton
                    color="primary"
                    sx={{ marginLeft: 1 }}
                    onClick={handleSend}
                >
                    <SendIcon />
                </IconButton>
            </Paper>
        </Box>
    );
}
