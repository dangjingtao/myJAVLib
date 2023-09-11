// 创建Socket服务器
const http = require("http");
const { Server } = require("socket.io");

const createSocket = ({ port }) => {
  const httpServer = http.createServer();
  const io = new Server(httpServer, {
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttemps: 10,
    // transports: ["websocket"],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
    cors: {
      origin: "http://localhost:8080",
    },
  });

  io.on("connection", (socket) => {
    console.log("cocket 客户端连接成功！");
    // 监听客户端发送的消息
    socket.on("chat", (msg) => {
      console.log("客户端发送chat消息:" + msg);
      // console.log("Received message from client: " + msg);
      // 广播消息给所有客户端
      io.emit("chat", msg);
    });

    // 当客户端断开连接时
    socket.on("disconnect", () => {
      console.log("socket服务器断开");
    });
  });

  io.listen(port);

  io.registerChanel = (chanel, handler) => {
    io.on("connection", (socket) => {
      // 监听客户端发送的消息
      socket.on(chanel, handler);
    });
  };

  return io;
};

module.exports = { createSocket };
