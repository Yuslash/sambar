import { app, BrowserWindow, Menu, screen, ipcMain } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'
import si from 'systeminformation'
import os from 'os'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let mainWindow

app.whenReady().then(() => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    width,
    height,
    frame: true,
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  })

  mainWindow.maximize()
  Menu.setApplicationMenu(null)

  const devServerUrl = 'http://localhost:5173'
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(devServerUrl)
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'))
  }

  mainWindow.on('closed', () => { mainWindow = null })
})

ipcMain.handle('get-cpu-usage', async () => {
  const load = await si.currentLoad()
  return load.currentLoad.toFixed(2)
})

ipcMain.handle('get-ram-usage', async () => {
  const memData = await si.mem()
  return ((memData.active / memData.total) * 100).toFixed(2)
})

ipcMain.handle('get-ip-address', async () => {
  const nets = os.networkInterfaces()
  let selectedIP = 'Unknown'

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (!net.internal && net.family === 'IPv4' && net.netmask !== '255.255.255.255') {
        if (net.gateway) return net.address // Prefer interfaces with a gateway
        selectedIP = net.address // Fallback to any non-internal IPv4
      }
    }
  }
  return selectedIP
})


app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
