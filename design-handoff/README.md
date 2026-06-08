# Design Handoff

这个目录用于把当前 Vue 作品集网站导出为多页面高清设计参考图，并交给 Figma / Figma Make 继续设计和改版。

## 使用方法

1. 先启动项目：

```bash
npm run dev
```

2. 再执行：

```bash
npm run export:figma
```

3. 截图会输出到：

```text
design-handoff/screenshots/
```

4. 把 `screenshots` 里的 PNG 和 `figma-make-brief.md` 内容上传/复制到 Figma Make 继续设计。

## 文件说明

- `screenshots/`：批量导出的页面截图。
- `figma-make-brief.md`：可直接复制给 Figma Make 的设计提示词。
- `page-map.md`：当前网站页面结构、作用和问题。
- `visual-redesign-goals.md`：整体视觉改版目标和后续分工。
