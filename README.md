# Angular-Electron Todo-App

## Clone this repo into new project folder :

```shell
git clone https://github.com/angular/quickstart  my-proj
```
## Angular setup :

- Install the npm packages described in the package.json and verify that it works:

```shell
npm install
npm start
```

`npm start` command will compile the application and run the `lite-server` on http://localhost:3000/

## Electron setup 

To install electron :

```shell

npm install electron --save

```

Add ` "main" : "main.js"` in your package.json and edit your main.js : 

```
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

```


## Run your electron app

``` shell
electron .
```

or 

``` shell 
.\node_modules\.bin\electron .
```

## Use nedb

- To install :

``` shell
npm install nedb --save  
```

- Add `'nedb': 'npm:nedb/browser-version/out/nedb.min.js'` in the bundler config

- To create and load the database add :

```shell 
var Datastore = require('nedb')
  , db = new Datastore({ filename: 'path/to/datafile', autoload: true });
```

- Crud with nedb :

  
  
  ```shell
  // To insert
  
  db.insert(doc, function (err, newDoc) {   // Callback is optional
  // newDoc is the newly inserted document, including its _id
  // newDoc has no key called notToBeSaved since its value was undefined
});

  // To read
  
  db.find({ value you want to find }, function (err, docs) {
  // docs is an array containing documents Mars, Earth, Jupiter
  // If no document is found, docs is equal to []
});

  // To update
  
   db.update({ planet: 'Jupiter' }, { planet: 'Pluton'}, {}, function (err, numReplaced) {
  // numReplaced = 1
  // The doc #3 has been replaced by { _id: 'id3', planet: 'Pluton' }
  // Note that the _id is kept unchanged, and the document has been replaced
  // (the 'system' and inhabited fields are not here anymore)
});
   
   // To delete
   
   db.remove({ _id: 'id2' }, {}, function (err, numRemoved) {
  // numRemoved = 1
});
  
  
  

  
