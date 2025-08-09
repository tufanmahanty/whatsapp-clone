import React, { useState, useEffect } from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography,
    Divider,
} from '@mui/material';
import api from "../utils/axios";

export default function Sidebar({ onSelectChat, selectedChat }) {
    const [chats, setChats] = useState([]);
    const fetchChats = async () => {
        try {
            const response = await api.get('/get-chat-list');
            const updatedChats = response.data.data.map((chat) => ({
                ...chat,
                src: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
            }));
            setChats(updatedChats);
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    }
    useEffect(() => {
        fetchChats()
    }, [])

    return (
        <Box sx={{ height: '100%', overflowY: 'auto' }}>
            <Typography variant="h6" p={2}>
                Chats
            </Typography>
            <Divider />
            <List disablePadding>
                {chats.map((chat) => (
                    <ListItem

                        key={chat._id}
                        onClick={() => onSelectChat(chat)}
                        sx={{
                            cursor: 'pointer', backgroundColor: chat === selectedChat ? '#E0E0E0' : '',
                            '&:hover': {
                                backgroundColor: '#F5F5F5',
                            },
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar src={chat.src} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={chat.name}
                            secondary={chat.lastMessage.slice(0, 20) + "..."}
                        />
                        <Typography
                            variant="caption"
                            sx={{ display: 'block', textAlign: 'right', pt: 4 }}
                        >
                            {new Date(chat.lastTime).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
