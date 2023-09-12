// main.js
const path = require("path");
// const { chalk } = require("chalk");
// electron 模块可以用来控制应用的生命周期和创建原生浏览窗口
const { app, BrowserWindow, ipcMain, protocol, net } = require("electron");
const { PORT } = require("../config");
const { initDataBase } = require("./sql/sequelize");
const EventBus = require("./eventBus");
const responseHandler = require("./lib/responseHandler.ts");

const { createSocket } = require("./lib/socket/index.js");

// const httpServer = http.createServer();
// const express = require("express")();

// const server = http.createServer(express);
// const io = require("socket.io")(server);

// const io = new Server({});

// httpServer.listen(9000, () => {
//   console.log("socket服务器成功");
// });

const createWindow = async () => {
  // 创建浏览窗口
  const mainWindow = new BrowserWindow({
    webPreferences: {
      devTools: true, //- 是否开启 DevTools. 如果设置为 false, 则无法使用
      preload: path.join(__dirname, "./preload/index.ts"),
    },
    frame: false,
    resizable: false,
    width: 300,
    height: 430,
  });

  // 支持files协议
  protocol.handle("atom", (request) =>
    net.fetch("file://" + request.url.slice("atom://".length))
  );
  // 支持video协议
  protocol.registerFileProtocol("video", async (request, callback) => {
    callback({ path: request.url.replace("video://", "") });
  });

  // 根据开发环境加载 index.html
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL(`http://localhost:${PORT}/`);
    // 打开开发工具
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../client/dist/index.html"));
  }

  return mainWindow;
};

app.on("activate", () => {
  // 在 macOS 系统内, 如果没有已开启的应用窗口
  // 点击托盘图标时通常会重新创建一个新窗口
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

const io = createSocket({ port: "9000" });

// 这段程序将会在 Electron 结束初始化和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(async function () {
  // 初始化数据库
  const sequelize = await initDataBase();

  // 创建响应器
  const response = responseHandler();

  // 创建window
  const win = await createWindow();
  // console.log(win);

  // 通信+ 注册
  const bus = new EventBus({
    app,
    win,
    sequelize,
    response,
    ipcMain,
    socket: io,
  });
  await bus.init();
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
// 直到用户使用 Cmd + Q 明确退出
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("will-quit", () => {
  localStorage.setItem("login", "false");
});

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。
