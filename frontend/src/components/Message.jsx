import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { DoubleTickIcon, SingleTickIcon } from "./tick";

export default function Message({ from, wa_id, message, timestamp, status }) {
    const isOwn = from !== wa_id;
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: isOwn ? 'flex-end' : 'flex-start',
                mb: 1,
            }}
        >
            <Paper
                elevation={1}
                sx={{
                    maxWidth: '70%',
                    padding: 1,
                    backgroundColor: isOwn ? '#dcf8c6' : '#ffffff',
                }}
            >
                <Typography variant="body2">{message}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Typography
                        variant="caption"
                        sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}
                    >
                        {new Date(timestamp).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{ display: 'block', textAlign: 'right', mt: 1 }}
                    >
                        {isOwn && (
                            status === "sent" ? (
                                <SingleTickIcon color="gray" />
                            ) : status === "delivered" ? (
                                <DoubleTickIcon color="gray" />
                            ) : status === "read" ? (
                                <DoubleTickIcon color="#34B7F1" />
                            ) : null
                        )}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}
