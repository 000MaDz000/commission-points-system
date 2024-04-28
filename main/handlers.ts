import { app, ipcMain } from "electron";

ipcMain.handle("getPath", (_e, str) => {
    return app.getPath(str);
});
