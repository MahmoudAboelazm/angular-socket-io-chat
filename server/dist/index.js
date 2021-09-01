"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io = require("socket.io")(3000, {
    cors: {
        origin: ["http://localhost:4200"],
    },
});
io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("message", (message, room) => {
        if (!room)
            io.emit("receive", message);
        else
            io.to(room).emit("receive", message);
    });
    socket.on("join-room", (room, cb) => {
        socket.join(room);
        cb("Joined to: " + room);
    });
});
//# sourceMappingURL=index.js.map