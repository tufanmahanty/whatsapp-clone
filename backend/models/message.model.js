import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    wa_id: { type: String, required: true },
    name: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, required: true },
    message_id: { type: String, unique: true },
    status: { type: String, default: "sent" }
});

MessageSchema.index({ wa_id: 1 });
MessageSchema.index({ timestamp: 1 });

const messageModel = mongoose.model("Message", MessageSchema);
export default messageModel;