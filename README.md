# Vue 3 + Vite + Electron

这是一个帮助你快速创建Electron应用开发框架的模板。

## IDE 和 需要安装的插件

名称: Prettier - Code formatter

VS Marketplace 链接: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

名称: Tailwind CSS IntelliSense

VS Marketplace 链接: https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss

## 可选插件：
名称: Path Intellisense

VS Marketplace 链接: https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense

名称: Auto Import

VS Marketplace 链接: https://marketplace.visualstudio.com/items?itemName=steoates.autoimport

名称: HTML Snippets

VS Marketplace 链接: https://marketplace.visualstudio.com/items?itemName=abusaidm.html-snippets

名称: IntelliSense for CSS class names in HTML

VS Marketplace 链接: https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion

名称: Vue Volar extension Pack

VS Marketplace 链接: https://marketplace.visualstudio.com/items?itemName=MisterJ.vue-volar-extention-pack

## 步骤
1. 安装node和npm
> 使用node版本管理工具 nvm https://github.com/coreybutler/nvm-windows
>
2. 配置国内镜像源 nvm安装路径下的settings.txt内添加
> node_mirror: http://npmmirror.com/mirrors/node
>
>npm_mirror: http://npmmirror.com/mirrors/npm

3. 使用 nrm 切换npm为国内镜像源
> npm install -g nrm
>
> nrm use taobao
4. 配置Electron国内镜像源 系统用户目录.npmrc文件中添加
> ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
>
>ELECTRON_BUILDER_BINARIES_MIRROR=http://npm.taobao.org/mirrors/electron-builder-binaries/

5. 根据博客操作
> https://zhuanlan.zhihu.com/p/421460116
> 
6. 继承测试 npm run exe