const { BrowserWindow } = require('electron');
const log = require('electron-log');
const { autoUpdater } = require('electron-updater');

function Updater() {
    this.check = () => {
        autoUpdater.checkForUpdatesAndNotify();
    };
}

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
});
autoUpdater.on('update-available', info => {
    sendStatusToWindow('Update available.');
});
autoUpdater.on('update-not-available', info => {
    sendStatusToWindow('Update not available.');
});
autoUpdater.on('error', err => {
    sendStatusToWindow('Error in auto-updater. ' + err);
});
autoUpdater.on('download-progress', progressObj => {
    sendStatusToWindow(progressObj.toString());
});
autoUpdater.on('update-downloaded', info => {
    sendStatusToWindow('Update downloaded');
});

function sendStatusToWindow(msg) {
    log.info(msg);
    BrowserWindow.getFocusedWindow().webContents.send('message', msg);
}

module.exports = new Updater();
