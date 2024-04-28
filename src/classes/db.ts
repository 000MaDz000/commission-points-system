
export type FS = typeof import("fs/promises");
export type Electron = typeof import("electron");
export type Path = typeof import("path");

const fs = window.require("fs/promises") as FS;
const { join } = window.require("path");
const { ipcRenderer } = window.require("electron/renderer");

export default class Db {
    static async getUrlFilePath() {
        const dataPath = await ipcRenderer.invoke("getPath", "userData");

        return join(dataPath, "url.txt");
    }
    static async getUrl() {
        try {
            const data = await fs.readFile(await Db.getUrlFilePath(),);
            return data.toString() || null
        }
        catch (e) {

            return null;
        }
    }

    static async setUrl(url: string) {

        try {
            const file = await Db.getUrlFilePath();
            await fs.writeFile(file, url);

            return true;
        } catch (err) { }


        return false;
    }
}
