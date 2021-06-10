module.exports = {
  publicPath: './',
  pluginOptions: {
    electronBuilder: {
      // 打包参数配置
      builderOptions: {
        nsis: {
          "oneClick": false, // 一键安装
          "perMachine": false, // 是否开启安装时权限限制（此电脑或当前用户）
          "allowElevation": false, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          "allowToChangeInstallationDirectory": true, // 允许修改安装目录
          "createDesktopShortcut": true, // 创建桌面图标
          "createStartMenuShortcut": true, // 创建开始菜单图标
        },
        asar: false,
      }
    }
  }
}