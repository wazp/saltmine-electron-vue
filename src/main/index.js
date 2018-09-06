'use strict'

import { app, Tray, Menu, BrowserWindow, screen, ipcMain } from 'electron'
import windowState from 'electron-window-state'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow, tray
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/`
  : `file://${__dirname}/index.html`
const platform = require('os').platform()

const trayIconOff = (platform === 'darwin') ? `${__static}/png-off/16x16.png` : `${__static}/png-off/32x32.png`
const trayIconOn = (platform === 'darwin') ? `${__static}/png-on/16x16.png` : `${__static}/png-on/32x32.png`

function createWindow () {
  /**
   * Initial window options
   */
  let mainWindowState = windowState({
    defaultWidth: 500,
    defaultHeight: 620
  })

  mainWindow = new BrowserWindow({
    frame: false,
    height: mainWindowState.height,
    useContentSize: false,
    width: mainWindowState.width,
    show: false,
    fullscreenable: false,
    x: mainWindowState.x,
    y: mainWindowState.y
  })

  // start state keeper on the main window
  mainWindowState.manage(mainWindow)

  mainWindow.once('ready-to-show', () => {
    // make sure window is visible, in case user moved it while having more than one screen or a bigger resolution
    mainWindow.show()

    const winBounds = mainWindow.getBounds()
    const isOnADisplay = screen.getAllDisplays()
      .map(display => winBounds.x >= display.bounds.x &&
        winBounds.x <= display.bounds.x + display.bounds.width &&
        winBounds.y >= display.bounds.y &&
        winBounds.y <= display.bounds.y + display.bounds.height)
      .some(display => display)

    if (!isOnADisplay) {
      mainWindow.setPosition(screen.getAllDisplays()[0].bounds.width - winBounds.width, screen.getAllDisplays()[0].bounds.height - winBounds.height)
    }
  })

  // build the menu used for config AND tray
  const menu = [
    {
      label: 'New...',
      accelerator: 'CmdOrCtrl+N',
      click: () => {
        mainWindow.webContents.send('new-timer', 1) // send ipc event to renderer
        mainWindow.show()
        mainWindow.focus()
      }
    },
    {
      label: 'Quit',
      accelerator: 'CmdOrCtrl+Q',
      click: () => {
        app.isQuitting = true
        app.quit()
      }
    }
  ]

  tray = new Tray(trayIconOff)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show',
      click: () => {
        mainWindow.show()
        mainWindow.focus()
      }
    },
    ...menu
  ]) // hook up the menu to the system tray icon
  tray.setToolTip('Saltmine')
  tray.setTitle('test!')
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('close', (e) => {
    if (!app.isQuitting) {
      e.preventDefault()
      mainWindow.hide()
    }
  })
}

app.on('ready', createWindow)

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// setup a listener for changing the icon
ipcMain.on('switchIcon', (e, a) => {
  if (a === 'on') {
    tray.setImage(trayIconOn)
  } else {
    tray.setImage(trayIconOff)
  }
})

// make the app single instance. if second instance is started, just show the already available mainWindow and quit second instance.
var iShouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.show()
    mainWindow.focus()
  }
  return true
})

if (iShouldQuit) {
  app.quit()
}

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
