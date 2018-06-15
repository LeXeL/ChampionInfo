const {app, BrowserWindow, Menu, protocol, ipcMain} = require('electron');
const log = require('electron-log');
const {autoUpdater} = require("electron-updater");

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow;
let updateDownloaded = false;

function sendStatusToWindow(text) {
  log.info(text);
  mainWindow.webContents.send('status',text)
}

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  ipcMain.on('Update',()=>{
    log.info("Update Request recieve")
    autoUpdater.quitAndInstall();  
  })
  mainWindow = new BrowserWindow({
    height: 720,
    useContentSize: true,
    width: 480,
  });
  mainWindow.setMenuBarVisibility(false)
  mainWindow.loadURL(winURL)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}


app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// autoUpdater.checkForUpdates();
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...'); 
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Updated');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in update');
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = 'Downloaded ' + progressObj.percent.toFixed(2) + '%';
  sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  updateDownloaded = true;
  sendStatusToWindow('Complete download');
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('ready', () => {
  setTimeout(()=>{
    autoUpdater.checkForUpdates()
  },2000)
  setInterval(()=>{
    if(!updateDownloaded){
      autoUpdater.checkForUpdates()
    }
  },600000)
})
