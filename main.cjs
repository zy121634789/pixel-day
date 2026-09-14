const {app,BrowserWindow,session}=require('electron');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const start=pathToFileURL(path.join(__dirname,'app/index.html')).href;
app.setName('Pixel Day');
let win;
if(!app.requestSingleInstanceLock())app.quit();
else{
app.on('second-instance',()=>{if(win){if(win.isMinimized())win.restore();win.show();win.focus();}});
app.whenReady().then(()=>{
session.defaultSession.setPermissionRequestHandler((_wc,_p,cb)=>cb(false));
win=new BrowserWindow({width:1180,height:900,minWidth:360,minHeight:580,backgroundColor:'#b7e4fa',autoHideMenuBar:true,icon:path.join(__dirname,'app/icons/icon-512.png'),webPreferences:{nodeIntegration:false,contextIsolation:true,sandbox:true,webSecurity:true}});
win.webContents.setWindowOpenHandler(()=>({action:'deny'}));
win.webContents.on('will-navigate',(e,url)=>{if(url!==start)e.preventDefault();});
win.loadURL(start);
win.webContents.on('did-finish-load',()=>{win.webContents.insertCSS('.install-entry{display:none!important}');});
});app.on('window-all-closed',()=>app.quit());
}
