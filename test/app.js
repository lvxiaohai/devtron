const { app, BrowserWindow } = require("electron");

require("../api").install();

let win;

app.on("ready", async () => {
    win = new BrowserWindow({
        height: 600,
        width: 800
    })

    await win.loadFile("fixtures/index.html");
    
    win.webContents.openDevTools();
})