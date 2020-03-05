const { app, BrowserWindow, dialog, shell, remote } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const { autoUpdater } = require("electron-updater");
let mainWindow;

app.on("ready", () => {
  console.log("before message box");
  dialog
    .showMessageBox({
      message: "更新提示",
      buttons: ["前往下载", "稍后提醒"],
      defaultId: 0, // bound to buttons array
      cancelId: 1 // bound to buttons array
    })
    .then(result => {
      if (result.response === 0) {
        // bound to buttons array
        shell.openExternal("https://koodo.102410.xyz/download");
      } else if (result.response === 1) {
        // bound to buttons array
        console.log("Cancel button clicked.");
      }
    });
  console.log("after message box");
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 660,
    webPreferences: {
      nodeIntegration: false
    }
  });
  if (!isDev) {
    const { Menu } = require("electron");
    Menu.setApplicationMenu(null);
  }

  const urlLocation = isDev
    ? "http://localhost:3000/"
    : `file://${path.join(__dirname, "./build/index.html")}`;
  mainWindow.loadURL(urlLocation);
});
