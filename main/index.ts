import { app, BrowserWindow } from "electron";
import { join } from "path";
import "./handlers";

function createWindow() {
    const window = new BrowserWindow({
        "webPreferences": {
            devTools: process.env.NODE_ENV === "development",
            "nodeIntegration": true,
            "contextIsolation": false,
        },
        autoHideMenuBar: true,
    });

    if (process.env.NODE_ENV === "development") {
        window.loadURL("http://localhost:3000/");
        window.webContents.openDevTools();
    }
    else {
        window.loadFile(join(__dirname, "../index.html"));
    }
}


app.whenReady().then(() => {
    createWindow();
});

app.on("window-all-closed", () => {
    app.quit();
})