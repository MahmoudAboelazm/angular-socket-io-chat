import { Socket } from "socket.io";
const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:4200"],
  },
});

io.on("connection", (socket: Socket) => {
  const id = socket.handshake.query.id as string;
  console.log("id", id);
  socket.join(id);

  socket.on("send-message", ({ recipients, text }) => {
    if (!recipients || !text) return;
    recipients.forEach((recipient: string) => {
      const newRecipients = recipients.filter((r: string) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });
});
///////
