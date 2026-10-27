# 我的数字宇宙 ✧

一个深蓝紫色星空风格的个人互动网站。纯 HTML、CSS、JavaScript，无需安装依赖、无需 API，也无需付费。

## 预览

直接双击 `index.html` 即可打开。建议用 Safari、Chrome 或 Edge 的较新版本。

想获得更稳定的浏览器本地保存效果，可在此文件夹打开终端，运行 `python3 -m http.server 8000`，再访问 http://localhost:8000 。终端按 Control + C 停止服务。直接双击文件和 HTTP 预览的心愿存储空间可能不同。

## 保存到 GitHub（无需编程）

1. 打开 https://github.com/ZiLinpen/-AI- 。
2. 点击 **Add file → Upload files**，把 `index.html`、`style.css`、`script.js`、`.nojekyll` 和本说明文件上传到仓库根目录。隐藏的 `.nojekyll` 可省略，本网站不依赖 Jekyll。
3. 在提交说明填写“添加我的数字宇宙网站”，点击 **Commit changes**。如页面显示创建首个文件的提示，点击 **uploading an existing file** 即可。

## 免费发布到 GitHub Pages

1. 在仓库中打开 **Settings → Pages**。
2. 在 **Build and deployment** 下，将 **Source** 选为 **Deploy from a branch**。
3. **Branch** 选择 `main`，文件夹选择 `/ (root)`，点击 **Save**。
4. 等待 GitHub 完成部署；Pages 页面会显示实际网站地址。预期地址：https://zilinpen.github.io/-AI-/ 。首次发布可能需要几分钟。
5. 后续在 GitHub 更新这些文件并提交，网站会自动重新部署。

如果看不到 `main`，请先完成文件上传。仓库需要保持公开才能使用 GitHub Free 的公开 Pages。发布状态可在仓库 **Actions** 查看。

## 功能与编辑

- 点击三张卡片，打开关于我、随机轮换的灵感、心愿输入框；Esc、右上角关闭按钮或弹窗外部可关闭。
- 鼠标移动产生星空视差、卡片微倾与光晕；触屏设备直接点击即可。
- 点击底部 ✦ 星星，发现隐藏彩蛋。
- 心愿仅存储在当前浏览器 `localStorage`，不会上传；可清除，不跨设备同步。
- 页面右上角可暂停星空；遵循系统减少动态效果的偏好。
- 在 `index.html` 更改标题、卡片文字；在 `script.js` 的 `templates` 中编辑弹窗介绍、在 `sparks` 中编辑灵感；在 `style.css` 中修改颜色和布局。
- 初始“关于我”是可替换的示例文案。

所有资源均为本地文件，星空与星球由代码绘制，无外部字体、图片或跟踪脚本。请勿在公开网页里写入密码等私密信息。
