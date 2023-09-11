// preload.js
// 所有的 Node.js API接口 都可以在 preload 进程中被调用.
// 它拥有与Chrome扩展一样的沙盒。
/**
 * 预加载脚本包含在浏览器窗口加载网页之前运行的代码。 其可访问 DOM 接口和 Node.js 环境，并且经常在其中使用 contextBridge 接口将特权接口暴露给渲染器。
 * 由于主进程和渲染进程有着完全不同的分工，Electron 应用通常使用预加载脚本来设置进程间通信 (IPC) 接口以在两种进程之间传输任意信息。
 */
const { contextBridge, ipcRenderer } = require("electron");

ipcRenderer.on("port", (e, { message: msg }) => {
  const extra = {};
  msg.forEach((m) => {
    extra[m] = (...args) => ipcRenderer.invoke(m, ...args);
  });

  try {
    contextBridge.exposeInMainWorld("app", {
      node: () => process.versions.node,
      chrome: () => process.versions.chrome,
      electron: () => process.versions.electron,
      ...extra,
    });
  } catch (error) {}

  // console.log(2222, extra);
  // ...
});

window.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("login", "false");
  //   const replaceText = (selector, text) => {
  //     const element = document.getElementById(selector);
  //     if (element) element.innerText = text;
  //   };
  //   for (const dependency of ["chrome", "node", "electron"]) {
  //     replaceText(`${dependency}-version`, process.versions[dependency]);
  //   }
});
