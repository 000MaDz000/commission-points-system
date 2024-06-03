const { ipcRenderer } = window.require("electron/renderer");
const { join } = window.require("path") as typeof import("path");
const fsp = window.require("fs/promises") as typeof import("fs/promises");

export default class Settings {
    static async getLocaleFilePath() {
        const userdata = await ipcRenderer.invoke("getPath", "userData");
        return join(userdata, "locale")
    }
    static async getLocale() {


        let locale = "en";
        const filePath = await Settings.getLocaleFilePath();

        try {
            locale = (await fsp.readFile(filePath)).toString();
        }
        catch (err) { }

        return locale;
    }

    static async setLocale(locale: "en" | "ar" | "fr") {
        const filePath = await Settings.getLocaleFilePath();
        try {
            await fsp.writeFile(filePath, locale);

        }
        catch (err) {
            console.log(err);

        }
    }
}