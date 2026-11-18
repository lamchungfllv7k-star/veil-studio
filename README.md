# 幽面 Veil Studio

[Open Veil Studio](https://veil-studio.satiny-hinny-4632.chatgpt.site) · [中文说明](#功能)

Veil Studio turns a portrait into a Halloween poster in your browser. Try the built-in illustration or import your own image, place a ghost, eye band, white circle or pixel mask over a face, then export a PNG. Keep the editable JSON if you want to revisit the layout. The JSON includes the original image; share the PNG when you only want to share the result.

**Run locally:** from the repository root, run `python3 -m http.server 8765 --directory dist` and visit `http://localhost:8765`. Run `node --test tests/core.test.mjs` to check layout coordinates, mask selection, project import and face geometry. Face detection runs on device; manually place masks on faces the model misses, especially drawings and animals.

**Development and attribution:** Work on Veil Studio began on November 17, 2026 with Codex assistance. The author's earlier [Baiquan](https://baiquan-face.pages.dev/) inspired the masking workflow. The poster layouts, mask rendering, editor state and editable project format were implemented for Veil Studio. The bundled MediaPipe runtime, WebAssembly files and model predate this project; see [third-party notices](dist/THIRD-PARTY-NOTICES.txt). Original code is MIT-licensed. Kiro has not yet been used to develop this version; the files in `.kiro/` were prepared with Codex.

角色遮罩与悬疑海报工作台。浏览器中导入图片，制作遮罩、排版海报、导出 PNG，也可以保存和重新打开编辑文件。

## 功能

- 幽灵、眼罩、白圈和像素四种不透明遮罩。
- 真实人脸自动定位，支持拖动、补充、缩放和删除。动物、动漫及复杂侧脸不保证自动识别，可手动处理。
- 原图遮罩模式保留原图分辨率；海报模式支持 4:5、9:16、1:1 三种比例与三种氛围。
- 标题、故事文字、撤销重做、按住对比、无水印 PNG 导出。
- JSON 编辑文件包含原始图片与编辑设置，可在以后恢复。
- 处理在设备浏览器内完成；无后端图片上传、分析或人脸身份识别。

## 本地运行与验证

在本目录运行 `python3 -m http.server 8765 --directory dist`，打开 `http://127.0.0.1:8765`。不要直接双击 HTML，因为模型和 JavaScript 模块需要 HTTP。

运行 `node --test tests/core.test.mjs` 检查坐标转换、导入校验及遮罩命中逻辑。

## 项目来源与真实开发记录

本项目于 2026-11-17 开始，由作者授权 Codex 协助开发。创作流程参考作者的既有作品「白圈」：https://baiquan-face.pages.dev/ 。本项目的界面、海报构图、遮罩渲染、状态管理和编辑文件功能为新实现；没有复制白圈的应用代码。

自动识别复用了白圈目录中已有的第三方 MediaPipe 运行库、WASM 和 Face Landmarker 模型副本。具体许可与来源见 `dist/THIRD-PARTY-NOTICES.txt`。这些预先存在的资源应在任何参赛或发布说明中如实披露。

截至当前版本，没有实际使用 Kiro 开发的记录。`.kiro` 中的需求和引导文档是由 Codex 准备的后续工作材料，不能作为已经使用 Kiro 的证明。本项目尚未提交 Kiroween，也未获资格确认；新项目与既有资源复用的最终判断由主办方决定。

## 使用限制

支持 JPG/PNG/WEBP，单张文件最大 20 MB、2400 万像素。编辑文件最大 35 MB。模型首次初始化可能较慢，模型失败时手动遮罩与导出仍可使用。图片损坏、极端画幅和复杂造型可能影响识别。

本工具用于创作，不保证隐藏人物身份。海报模式对原图进行排版并增加渐变；保留原始视觉的需求请使用原图遮罩模式。编辑文件包含原图，应按素材敏感程度自行保管。

## 源码许可

原创代码采用 MIT。第三方运行库与模型保留其各自许可。
