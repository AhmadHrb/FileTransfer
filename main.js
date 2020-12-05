const {app, BrowserWindow} = require('electron')
const path = require('path')
function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 300,
        title: "File Transfer",
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })

    mainWindow.loadFile('index.html')
    mainWindow.setMenu(null)
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
    app.allowRendererProcessReuse=false;
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})