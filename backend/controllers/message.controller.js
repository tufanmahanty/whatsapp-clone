import messageModel from "../models/message.model.js"

export const getChatList = async (req, res) => {
    try {
        const chatList = await messageModel.aggregate([
            { $sort: { timestamp: -1 } },
            {
                $group: {
                    _id: "$wa_id",
                    name: { $first: "$name" },
                    lastMessage: { $first: "$message" },
                    lastTime: { $first: "$timestamp" }
                }
            },
            { $sort: { lastTime: -1 } }
        ]).exec();

        if (!chatList) {
            return res.status(500).json({
                success: false,
                message: "failed to get chatlist"
            })
        }
        return res.status(200).json({
            success: true,
            data: chatList
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}

export const getChatByUser = async (req, res) => {
    const wa_id = req.query.wa_id;
    if (!wa_id) {
        return res.status(400).json({
            success: false,
            message: "user details missing"
        })
    }
    try {
        const chats = await messageModel.find({ wa_id }).sort({ timestamp: 1 });

        if (!chats) {
            return res.status(500).json({
                success: false,
                message: "failed to get chats"
            })
        }
        return res.status(200).json({
            success: true,
            data: chats
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}

export const sendMessage = async (req, res) => {
    const { wa_id, name, from, to, timestamp, message, message_id, status } = req.body;

    if (!wa_id || !name || !from || !to || !timestamp || !message || !message_id || !status) {
        return res.status(400).json({
            success: false,
            message: "user details missing"
        })
    }

    try {
        const newMessage = await messageModel.create({
            wa_id,
            name,
            from,
            to,
            timestamp,
            message,
            message_id,
            status
        })
        if (!newMessage) {
            return res.status(500).json({
                status: false,
                message: "failed to send"
            })
        }

        return res.status(200).json({
            success: true,
            data: newMessage
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}