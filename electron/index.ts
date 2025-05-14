import { app, BrowserWindow } from 'electron'
import path from 'path'

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  if (mainWindow) return; // 避免重复创建

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // 允许渲染进程使用 Node API
      webSecurity: false       // 禁用同源策略（开发环境）
    }
  })

  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, '../dist-electron/index.html'))
  } else {
    mainWindow.loadURL('http://localhost:5173')
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  });
}

app.on('ready', () => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})