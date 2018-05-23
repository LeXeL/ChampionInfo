const {app, BrowserWindow, Menu, protocol, ipcMain} = require('electron');
const log = require('electron-log');
const {autoUpdater} = require("electron-updater");
const EventEmitter = require('events')

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow;

function sendStatusToWindow(text) {
  log.info(text);
  mainWindow.webContents.send('status',text)
}

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
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
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater.');
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded; will install in 5 seconds');
});

autoUpdater.on('update-downloaded', (info) => {
  // Wait 5 seconds, then quit and install
  // In your application, you don't need to wait 5 seconds.
  // You could call autoUpdater.quitAndInstall(); immediately
  setTimeout(function() {
    autoUpdater.quitAndInstall();  
  }, 5000)
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('ready', () => {
  setTimeout(()=>{
    autoUpdater.checkForUpdates()
  },2000)
})
