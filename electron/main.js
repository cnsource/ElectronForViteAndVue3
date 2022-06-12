const {
    app,
    Tray,
    Menu,
    BrowserWindow,
    globalShortcut,
    clipboard,
    nativeImage,
    ipcMain,
} = require("electron");

const path = require("path");
var robot = require("robotjs");

const {setTimeout} = require("timers");

const NODE_ENV = "dev";
const preloadWindow = {};
const allWindow = [];
var APP_Quit = false;

const winURL =
    NODE_ENV === "dev"
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../dist/index.html")}`;

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        title: "Code Snipate",
        width: 700,
        height: 600,
        minHeight: 400,
        minWidth: 400,
        show: false,
        // titleBarStyle: "hidden",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, "/preload.js"),
        },
    });
    // mainWindow.setMenu(null);
    mainWindow.loadURL(winURL);

    mainWindow.on("ready-to-show", () => {
        mainWindow.show();
    });
    mainWindow.on("close", (e) => {
        if (!APP_Quit) {
            mainWindow.hide();
            e.preventDefault();
        }
    });
    preloadWindow.mainView = mainWindow;
    allWindow.push(mainWindow);
};

app.whenReady().then(() => {
    initTray();
    registerGlobalShortCut();
    createWindow();
    createCodeSaveWindow();
    listenRendererEvent();
});

// 去除菜单栏
// app.applicationMenu = null;

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on("will-quit", () => {
    preloadWindow.codeSaveViewView = null;
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

function registerGlobalShortCut() {
    globalShortcut.register("Shift+Alt+W", () => {
        setTimeout(() => {
            robot.keyToggle("w", "up");
            robot.keyToggle("shift", "up");
            robot.keyToggle("alt", "up");

            robot.keyTap("c", "control");
        }, 10);
        setTimeout(() => {
            var clipCode = clipboard.readText("selection");
            preloadWindow.codeSaveView.webContents.send("clipMsg", clipCode);
            preloadWindow.codeSaveView.show();
        }, 30);
    });
}

const createCodeSaveWindow = () => {

    const codeSaveWindow = new BrowserWindow({
        width: 700,
        height: 500,
        minWidth: 400,
        minHeight: 300,
        titleBarStyle: 'hidden',
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, "/preload.js"),
        },
    });

    codeSaveWindow.setMenu(null);
    codeSaveWindow.loadURL(winURL + "/codeSave");

    codeSaveWindow.on("close", (e) => {
        if (!APP_Quit) {
            codeSaveWindow.hide();
            e.preventDefault();
        }
    });
    allWindow.push(codeSaveWindow);
    preloadWindow.codeSaveView = codeSaveWindow;
};

function initTray() {
    const app_quit = {
        label: "退出",
        type: "normal",
        click: () => {
            APP_Quit = true;
            allWindow.forEach((win) => {
                if (!win.isDestroyed()) {
                    win.destroy();
                }
            });
            app.quit();
        },
    };
    const showAppMainView = {
        label: "显示主界面",
        type: "normal",
        click: () => {
            preloadWindow.mainView.show();
        },
    };

    const icon = nativeImage.createFromPath(
        path.join(__dirname, "/assert/falcon.png")
    );
    let tray = new Tray(icon);
    const contextMenu = Menu.buildFromTemplate([showAppMainView, app_quit]);
    tray.setContextMenu(contextMenu);
    tray.setToolTip("Code Snipast");
    tray.setTitle("恭喜你发现了宝藏");
    tray.on("double-click", () => {
        preloadWindow.mainView.show();
    });
}

function listenRendererEvent() {
    ipcMain.on("window-close", (e, data) => {
        console.log(data)
        if (data.action === 'hide') {
            preloadWindow[data.view].hide();
        }
        if (data.action === 'destroy') {
            preloadWindow[data.view].destroy();
            delete preloadWindow[data.view];
        }
    });

    ipcMain.on('window-min', (e,data) => {
        preloadWindow[data.view].minimize();
    })

    ipcMain.on('window-max', (e,data) => {
        preloadWindow[data.view].maximize();
    })
    //
    ipcMain.on("loginEvent", (e, data) => {
        if (preloadWindow.loginView) {
            preloadWindow.loginView.show();
            return;
        }
        const loginWindow = new BrowserWindow({
            width: 600,
            height: 700,
            minWidth: 600,
            minHeight: 700,
            maxWidth: 600,
            maxHeight: 700,
            titleBarStyle: 'hidden',
            show: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                preload: path.join(__dirname, "/preload.js"),
            },
        });

        loginWindow.setMenu(null);
        loginWindow.loadURL(winURL + "/login")

        loginWindow.on('ready-to-show', () => {
            loginWindow.show();
        })
        preloadWindow.loginView = loginWindow;
        allWindow.push('loginView', loginWindow);
    });
}
