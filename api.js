const { app, session } = require('electron');

exports.install = () => {
  if (process.type === 'renderer' || process.type === "browser") {
    app.on("ready", () => {
      console.log(`Installing Devtron from ${__dirname}`)
      if (session.defaultSession.getAllExtensions() &&
        session.defaultSession.getAllExtensions().some(v => v.name === "devtron")) return true
      return session.defaultSession.loadExtension(__dirname)
    })
  } else {
    throw new Error('Devtron can only be installed from an Electron process.')
  }
}

exports.uninstall = () => {
  if (process.type === 'renderer' || process.type === "browser") {
    if (app.isReady() === false) throw new Error("You can't uninstall Devtron before the app loads")
    console.log(`Uninstalling Devtron from ${__dirname}`)
    const extId = session.defaultSession.getAllExtensions().filter(v => v.name === "devtron")[0].id;
    return session.defaultSession.removeExtension(extId);
  } else {
    throw new Error('Devtron can only be uninstalled from an Electron process.')
  }
}

exports.path = __dirname
