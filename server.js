const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const express = require("express");
const path = require("path");
const http = require("http");
const PORT = process.env.PORT || 5000;
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

io.on("connection", (socket) => {
  socket.on("join", (payload, callback) => {
    let numberOfUsersInRoom = getUsersInRoom(payload.room).length;

    const { error, newUser } = addUser({
      id: socket.id,
      name:
        numberOfUsersInRoom === 0
          ? "Player 1"
          : "Player " + (numberOfUsersInRoom + 1),
      room: payload.room,
    });

    if (error) return callback(error);

    socket.join(newUser.room);

    io.to(newUser.room).emit("roomData", {
      room: newUser.room,
      users: getUsersInRoom(newUser.room),
    });
    socket.emit("currentUserData", { name: newUser.name });
    callback();
  });

  socket.on("initGameState", (gameState) => {
    const user = getUser(socket.id);
    if (user) io.to(user.room).emit("initGameState", gameState);
  });

  // En jugada recibida
  socket.on("move", (listener) => {
    const user = getUser(socket.id);

    // Reenviar la jugada a otros jugadores
    if (user)
      io.to(user.room).emit("move", {
        user: listener.user,
        direction: listener.direction,
      });
    //if (user) socket.broadcast.emit("move", player);
  });

  socket.on("disconnection", () => {
    const user = removeUser(socket.id);
    if (user)
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
  });
});

//serve static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
