"use strict";
const electron = require("electron");
const path = require("path");
let mainWindow = null;
const createWindow = () => {
  if (mainWindow) return;
  mainWindow = new electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // 允许渲染进程使用 Node API
      webSecurity: false
      // 禁用同源策略（开发环境）
    }
  });
  if (electron.app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, "../dist-electron/index.html"));
  } else {
    mainWindow.loadURL("http://localhost:5173");
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};
electron.app.on("ready", () => {
  createWindow();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") electron.app.quit();
});
//# sourceMappingURL=index.js.map
