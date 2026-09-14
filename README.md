# 像素日常 / Pixel Day

像素风每日待办、随机生活任务与积分记录。Windows 独立窗口应用，内置中文像素字体，不依赖网络加载页面。

## 下载
在本仓库 Releases 下载 `Pixel-Day-0.1.0-Windows-x64.exe`。支持 Windows 10/11 x64。安装包未进行商业代码签名，Windows 可能提示未知发布者；请核对来源与 SHA256，不要关闭系统安全防护。

## 功能
今日任务、自定义待办优先、日期与重复任务、随机推荐、彩蛋、完成撤销、积分历史、JSON 导入导出。数据仅存储在本机 Electron 用户数据目录，无账号及云同步。网页数据不会自动迁移，请导出后导入。卸载程序默认不清除用户数据。

## 开发
Node.js 22.12+；`npm install`，`npm start`；构建 `npm run dist`。GitHub Actions 在 Windows 上构建 NSIS 安装包并生成 SHA256，发布 v 开头标签时上传 GitHub Release。

## 安全与许可证
渲染器关闭 Node 集成，启用隔离与沙箱，拒绝权限请求和外部导航。中文字体 Fusion Pixel v2026.09.01，SIL OFL 1.1，许可证见 app/fonts。项目源码尚未另行授予开源许可证，公开可见不代表放弃著作权。Electron 与依赖保留各自许可证。

本版本为早期测试版本。CI构建通过不等于所有Windows机器完成实测；请备份重要数据。
