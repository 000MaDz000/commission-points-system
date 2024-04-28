import { app, BrowserWindow } from "electron";
import { join } from "path";

function createWindow() {
    const window = new BrowserWindow({
        "webPreferences": {
            devTools: process.env.NODE_ENV === "development",
            "nodeIntegration": true,
            "contextIsolation": false,
        }
    });

    if (process.env.NODE_ENV === "development") {
        window.loadURL("http://localhost:3000/");
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