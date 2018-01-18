const fs = require('fs');
const path = require('path');

const fsExtra = require('fs-extra');
const renderHome = require('./controller/build');

let main = {
  async init() {
    // 清空 build 文件夹
    await this.emptyDirBy(`${__dirname}\\build`);

    // 复制 dist 文件夹
    fs.mkdirSync(`${__dirname}\\build`);
    await this.copyDirBy(`${__dirname}\\static\\dist`, `${__dirname}\\build\\dist`);

    // 渲染 index 首页
    await renderHome();
  },

  async copyDirBy(prevFile, targetFile) {
    try {
      await fsExtra.copy(prevFile, targetFile)
    } catch (err) {
      console.error(`复制 ${prevFile} 文件出错! 原因: ${err}`)
    }
  },

  async emptyDirBy(fileUrl) {
    try {
      await fsExtra.remove(fileUrl);
    } catch (err) {
      console.error(`删除 ${fileUrl} 文件出错! 原因: ${err}`)
    }
  }
}

main.init();
