'use strict';
(()=>{
let promptEvent=null;
const button=document.createElement('button');button.className='small install-entry';button.textContent='＋ 安装到桌面';
const host=document.querySelector('.local');host.innerHTML='<span class="local-label">● 本地保存 · 像素日常</span>';host.append(button);
const dialog=document.createElement('dialog');dialog.setAttribute('aria-labelledby','pwa-title');dialog.innerHTML='<h2 id="pwa-title">把日常装进口袋</h2><div class="pwa-copy"><p>iPhone / iPad：</p><ol><li>用 Safari 打开网站链接（不要停留在微信内置浏览器）。</li><li>点击分享按钮，选择「添加到主屏幕」。</li><li>如果出现「作为网页 App 打开」选项，请保持开启，再点「添加」。</li></ol><p>安卓或电脑：使用浏览器菜单中的「安装应用」或「添加到主屏幕」。</p><p>首次联网打开并完成缓存后，可离线打开任务与像素字体。</p><p>数据仅保存在当前设备，不会跨设备同步。安装后的存储空间可能与浏览器不同；已有记录请先导出备份，安装后按需导入。</p><p class="pwa-status" id="pwa-status">正在检查离线能力…</p></div><div class="buttons"><button class="primary" id="pwa-close">知道了</button></div>';
document.body.append(dialog);document.getElementById('pwa-close').onclick=()=>dialog.close();
const status=text=>document.getElementById('pwa-status').textContent=text;
button.onclick=async()=>{if(promptEvent){const pending=promptEvent;promptEvent=null;await pending.prompt();await pending.userChoice;}else dialog.showModal()};
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();promptEvent=event});
window.addEventListener('appinstalled',()=>{promptEvent=null;button.textContent='✓ 已安装'});
if(matchMedia('(display-mode: standalone)').matches||navigator.standalone)button.textContent='安装与离线说明';
if(location.protocol==='file:'){status('当前是本地文件：需部署为 HTTPS 网站后，才能安装并启用离线缓存。');return}
if(!window.isSecureContext||!('serviceWorker' in navigator)){status('此环境无法启用离线缓存，请通过 HTTPS 使用支持的浏览器。');return}
navigator.serviceWorker.register('./sw.js').then(reg=>{
const ready=()=>status('离线资源已准备好。更新时请关闭所有应用窗口，再重新打开。');
if(reg.active)ready();else navigator.serviceWorker.ready.then(ready);
const watch=worker=>{if(!worker)return;worker.addEventListener('statechange',()=>{if(worker.state==='installed'){if(navigator.serviceWorker.controller)status('新版已下载，关闭所有应用窗口后重新打开即可更新。');else ready()}if(worker.state==='redundant'&&!reg.active)status('离线资源未能缓存，请联网重新打开。')})};watch(reg.installing);reg.addEventListener('updatefound',()=>watch(reg.installing));if(reg.waiting)status('新版已下载，关闭所有应用窗口后重新打开即可更新。');
}).catch(()=>status('离线缓存注册失败，请检查网络及浏览器设置后重试。'));
})();
