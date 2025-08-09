import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import messageModel from "../models/message.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loadPayloads = async () => {
    const folderPath = path.join(__dirname, "..", "payloads");
    const files = await fs.readdir(folderPath);

    for (let file of files) {
        const filePath = path.join(folderPath, file);
        const raw = await fs.readFile(filePath);
        const payload = await JSON.parse(raw);

        const entry = payload.metaData?.entry?.[0];
        const change = entry?.changes?.[0]?.value;

        if (change?.statuses) {
            for (let status of change.statuses) {
                const exists = await messageModel.findOne({ message_id: status.id });
                if (exists.status !== status.status) {
                    exists.status = status.status;
                    await exists.save();
                }
            }
        }

        if (change?.messages) {
            for (let msg of change.messages) {
                const exists = await messageModel.findOne({ message_id: msg.id });
                if (!exists) {
                    await messageModel.create({
                        wa_id: change.contacts?.[0]?.wa_id,
                        name: change.contacts?.[0]?.profile?.name || 'Unknown',
                        from: msg.from,
                        to: change.metadata.display_phone_number,
                        message: msg.text?.body || '',
                        timestamp: new Date(Number(msg.timestamp) * 1000),
                        message_id: msg.id,
                        status: "sent",
                    });
                }
            }
        }
    }
};

export default loadPayloads;
