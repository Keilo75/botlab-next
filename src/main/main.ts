import { app, BrowserWindow, Menu } from 'electron';
import path from 'path';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const menu = Menu.buildFromTemplate([]);
Menu.setApplicationMenu(menu);

let mainWindow: BrowserWindow;
const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    minHeight: 800,
    minWidth: 1000,
    icon: path.join(process.cwd(), 'assets', 'icon', 'icon.png'),
    show: false,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  if (!app.isPackaged) mainWindow.webContents.openDevTools();

  // Show window when its ready to
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
    mainWindow.maximize();
  });
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
});

// Install extensions
app.whenReady().then(() => {
  installExtension([REACT_DEVELOPER_TOOLS])
    .then((name) => console.log(`Added extension(s): ${name}`))
    .catch((error) => 'An error occured: ' + error);
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
