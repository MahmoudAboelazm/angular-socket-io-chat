"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io = require("socket.io")(3000, {
    cors: {
        origin: ["http://localhost:4200"],
    },
});
io.on("connection", (socket) => {
    const id = socket.handshake.query.id;
    console.log("id", id);
    socket.join(id);
    socket.on("send-message", ({ recipients, text }) => {
        if (!recipients || !text)
            return;
        recipients.forEach((recipient) => {
            const newRecipients = recipients.filter((r) => r !== recipient);
            newRecipients.push(id);
            socket.broadcast.to(recipient).emit("receive-message", {
                recipients: newRecipients,
                sender: id,
                text,
            });
        });
    });
});
//# sourceMappingURL=index.js.map