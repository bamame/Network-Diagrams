# 儿童计算器 APP（Kids Calculator）

这是一个纯前端的小应用（`index.html + style.css + script.js`），不需要安装依赖。

## 运行方式（推荐）

> 你看到“Directory listing for /”是因为服务器在错误目录启动了。

1. 先进入项目目录：

```bash
cd /workspace/Network-Diagrams
```

2. 在这个目录启动本地服务：

```bash
python3 -m http.server 4173
```

3. 浏览器打开：

```text
http://127.0.0.1:4173/index.html
```

> 建议直接带上 `/index.html`，避免打开目录列表页面。

4. 关闭服务：按 `Ctrl + C`。

---

## 备用方式

也可以直接双击 `index.html` 在浏览器打开。

---

## 常见问题

### 为什么会出现目录列表（Directory listing）？

通常是以下原因之一：

- 服务不是在本项目目录启动的。
- 打开的 URL 是根路径 `/`，而不是 `/index.html`。

按上面的“运行方式（推荐）”重试即可。
