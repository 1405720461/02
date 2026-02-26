---
title: AI 智能体技能 Top 10 使用指南
description: 基于 skills.sh 排行榜（截至 2026 年 2 月），精选安装量最高的 10 个 AI 技能，含安装方法与使用示例。
tags:
  - AI
  - 智能体
  - skills
  - Cursor
  - 技能
categories:
  - AI
swiper_index: 3
abbrlink: 19af7e83
date: 2026-02-24 00:00:00
updated: 2026-02-24 00:00:00
---

# AI 智能体技能 Top 10 使用指南

> 基于 skills.sh 排行榜数据（截至 2026 年 2 月），精选安装量最高的 10 个技能，帮你快速提升 AI 助手能力。

---

## 快速导航

| 排名 | 技能名称 | 安装量 | 适合场景 |
|------|----------|--------|----------|
| 1 | [find-skills](#1-find-skills) | 328.8K | 发现新技能 |
| 2 | [vercel-react-best-practices](#2-vercel-react-best-practices) | 168.8K | React 开发 |
| 3 | [web-design-guidelines](#3-web-design-guidelines) | 129.0K | 网页设计审查 |
| 4 | [remotion-best-practices](#4-remotion-best-practices) | 112.6K | 视频动画制作 |
| 5 | [frontend-design](#5-frontend-design) | 100.7K | 前端界面设计 |
| 6 | [azure-observability](#6-azure-observability) | 61.0K | Azure 监控 |
| 7 | [skill-creator](#7-skill-creator) | 49.5K | 创建自定义技能 |
| 8 | [pdf](#8-pdf) | 22.0K | PDF 处理 |
| 9 | [next-best-practices](#9-next-best-practices) | 21.0K | Next.js 开发 |
| 10 | [brainstorming](#10-brainstorming) | 31.4K | 创意构思 |

---

## 1. find-skills 🔍

**安装量：328.8K** | **来源：vercel-labs/skills**

### 这是什么？

**技能界的"应用商店搜索"** — 帮你发现和安装其他技能的元技能。

### 什么时候用？

- 你想找个特定功能的技能，但不知道叫什么名字
- 用户问"有没有能帮我做 XX 的技能？"
- 想扩展 AI 助手的能力边界
- 想了解某个领域有哪些现成的技能可用

### 安装方法

```bash
npx skills add vercel-labs/skills@find-skills
```

### 使用示例

**场景 1：找性能优化技能**
```
你：怎么让我的 React 应用更快？
AI：让我帮你找找有没有相关的技能...
    [运行：npx skills find react performance]
    
找到了！"vercel-react-best-practices" 技能提供 Vercel 官方的
    React 性能优化指南，包含 57 条规则。
    
安装命令：npx skills add vercel-labs/agent-skills@vercel-react-best-practices
```

**场景 2：找代码审查技能**
```
你：有没有能帮我审查 PR 的技能？
AI：[运行：npx skills find pr review]
    
找到 3 个相关技能：
1. code-review-excellence - 代码审查最佳实践
2. requesting-code-review - 如何请求代码审查
3. receiving-code-review - 如何接收代码审查反馈
```

### 搜索技巧

| 类别 | 推荐关键词 |
|------|------------|
| Web 开发 | react, nextjs, typescript, css, tailwind |
| 测试 | testing, jest, playwright, e2e |
| DevOps | deploy, docker, kubernetes, ci-cd |
| 文档 | docs, readme, changelog, api-docs |
| 代码质量 | review, lint, refactor, best-practices |
| 设计 | ui, ux, design-system, accessibility |

### 为什么它排第一？

这是**所有技能的入口** — 安装了它，你才能发现其他技能。就像有了手机后，第一件事是装应用商店。

---

## 2. vercel-react-best-practices ⚛️

**安装量：168.8K** | **来源：vercel-labs/agent-skills**

### 这是什么？

**Vercel 官方维护的 React/Next.js 性能优化指南**，包含 57 条规则，按影响程度分 8 个优先级。

### 什么时候用？

- 写新的 React 组件或 Next.js 页面
- 审查代码中的性能问题
- 优化 bundle 大小或加载时间
- 重构现有的 React/Next.js 代码

### 安装方法

```bash
npx skills add vercel-labs/agent-skills@vercel-react-best-practices
```

### 核心规则（按优先级）

#### 🔴 关键级（必须遵守）

**消除瀑布流请求**
```javascript
// ❌ 错误：串行请求
const data = await fetch('/api/user');
const posts = await fetch(`/api/posts/${data.id}`);

// ✅ 正确：并行请求
const [data, posts] = await Promise.all([
  fetch('/api/user'),
  fetch(`/api/posts/${data.id}`)
]);
```

**优化 Bundle 大小**
```javascript
// ❌ 错误：使用桶文件导入
import { Button, Input, Modal } from '@company/ui';

// ✅ 正确：直接导入
import Button from '@company/ui/Button';
import Input from '@company/ui/Input';
import Modal from '@company/ui/Modal';
```

#### 🟡 高级（强烈推荐）

**Server Action 认证**
```javascript
// ✅ Server Action 要像 API 路由一样认证
async function updateProfile(formData) {
  const user = await auth();  // 先认证
  if (!user) throw new Error('Unauthorized');
  // ... 业务逻辑
}
```

**使用 React.cache() 去重**
```javascript
import { cache } from 'react';

const getUser = cache(async (id) => {
  return db.user.findUnique({ where: { id } });
});
```

### 实际效果

使用此技能后，AI 会在生成/审查 React 代码时自动应用这些规则：
- 自动并行化独立的数据请求
- 避免不必要的客户端组件
- 优化图片加载策略
- 减少 re-render 次数

### 适合谁？

- React/Next.js 开发者
- 追求性能优化的团队
- 需要代码审查辅助的场景

---

## 3. web-design-guidelines 🎨

**安装量：129.0K** | **来源：vercel-labs/agent-skills**

### 这是什么？

**网页设计合规性检查工具** — 自动审查你的 HTML/CSS 代码是否符合现代网页设计最佳实践。

### 什么时候用？

- 完成一个页面后，检查设计质量
- 审查团队成员的代码
- 学习网页设计标准
- 确保项目设计一致性

### 安装方法

```bash
npx skills add vercel-labs/agent-skills@web-design-guidelines
```

### 使用示例

```bash
# 审查单个文件
npx skills run web-design-guidelines --file src/pages/home.tsx

# 审查整个目录
npx skills run web-design-guidelines --pattern "src/components/**/*.tsx"
```

### 检查内容

技能会从以下维度审查代码：

| 维度 | 检查项 |
|------|--------|
| **可访问性** | ARIA 标签、键盘导航、颜色对比度 |
| **响应式设计** | 断点设置、移动端适配、图片响应式 |
| **性能** | 图片优化、字体加载、CSS 效率 |
| **一致性** | 命名规范、组件结构、样式组织 |
| **现代实践** | CSS 变量、语义化 HTML、渐进增强 |

### 输出格式

```
src/components/Button.tsx:23 - 颜色对比度不足 (WCAG AA)
src/pages/home.tsx:45 - 缺少移动端断点
src/components/Form.tsx:12 - 表单字段缺少 label
```

### 为什么需要它？

设计审查通常依赖人工，但这个技能可以：
- **自动化**：每次提交自动检查
- **一致性**：不同人审查标准统一
- **教育性**：指出问题的同时解释原因

---

## 4. remotion-best-practices 🎬

**安装量：112.6K** | **来源：remotion-dev/skills**

### 这是什么？

**Remotion 视频开发指南** — Remotion 官方维护的技能，帮你用 React 代码生成视频。

### 什么是 Remotion？

Remotion 是一个**用 React 写视频**的框架。你可以：
- 用 JSX 写视频场景
- 用 CSS 做动画
- 用 JavaScript 控制时间线
- 渲染成 MP4 输出

### 什么时候用？

- 制作程序化视频（数据可视化、动态图表）
- 批量生成个性化视频
- 创建视频模板系统
- 自动化视频编辑任务

### 安装方法

```bash
npx skills add remotion-dev/skills@remotion-best-practices
```

### 核心能力

| 能力 | 说明 |
|------|------|
| **3D 内容** | Three.js + React Three Fiber 集成 |
| **动画** | 基础动画、缓动函数、弹簧动画 |
| **音频可视化** | 频谱条、波形、低音反应效果 |
| **字幕** | 字幕/字幕同步 |
| **图表** | 柱状图、饼图、折线图、K 线图 |
| **字体** | Google Fonts、本地字体加载 |
| **Lottie** | 嵌入 Lottie 动画 |
| **转场** | 场景过渡效果 |
| **视频处理** | 修剪、速度、音量、循环 |
| **AI 配音** | ElevenLabs TTS 集成 |

### 使用示例

**创建一个简单的视频组合**

```jsx
import { Composition } from 'remotion';
import { MyVideo } from './MyVideo';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="MyVideo"
        component={MyVideo}
        durationInFrames={300}  // 10 秒 @ 30fps
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
```

**添加音频可视化**

```jsx
import { useAudioData, visualizeAudio } from '@remotion/audio';

export function AudioVisualizer({ audioFile }) {
  const audioData = useAudioData(audioFile);
  
  if (!audioData) return null;
  
  const frequencyData = visualizeAudio({
    fftSize: 2048,
    audioData,
    currentTimeInTrack: 0,
  });
  
  return (
    <div className="visualizer">
      {frequencyData.map((value, i) => (
        <Bar key={i} height={value} />
      ))}
    </div>
  );
}
```

### 实际应用场景

1. **营销视频自动化**：根据 CSV 数据批量生成产品宣传视频
2. **社交媒体内容**：自动生成带字幕的短视频
3. **数据报告**：将数据图表转化为动态视频
4. **个性化视频**：为每个用户生成定制化欢迎视频

### 学习资源

- 官方文档：https://www.remotion.dev/
- 示例库：https://github.com/remotion-dev/skills

---

## 5. frontend-design 🌟

**安装量：100.7K** | **来源：anthropics/skills**

### 这是什么？

**反"AI 味"的前端设计指南** — 教你创建有特色、不落俗套的界面，避免千篇一律的"AI 生成感"。

### 为什么需要它？

很多 AI 生成的前端代码有共同问题：
- 用烂了的字体（Inter、Roboto、Arial）
- 紫色渐变 + 白色背景的俗气配色
- 模板化的布局，毫无特色
- 缺乏设计意图，只是组件堆砌

这个技能就是要**打破这种模式**。

### 安装方法

```bash
npx skills add anthropics/skills@frontend-design
```

### 设计原则

#### 1. 选择大胆的美学方向

不要做"还不错"的设计，要做**有态度**的设计：

| 风格 | 特点 |
|------|------|
| 极简主义 | 极致留白、精确间距、克制用色 |
| 极繁主义 | 丰富细节、多层效果、大胆用色 |
| 复古未来 | 80 年代元素 + 现代技术 |
| 粗野主义 | 原始、未加工、反精致 |
| 装饰艺术 | 几何图案、奢华感、对称性 |
| 有机自然 | 流动形态、自然纹理、柔和色彩 |

#### 2. 字体要有个性

```css
/* ❌ 避免：随处可见的字体 */
font-family: 'Inter', system-ui, sans-serif;

/* ✅ 尝试：有特色的字体组合 */
font-family: 'Space Grotesk', 'IBM Plex Sans', sans-serif;
/* 或 */
font-family: 'Playfair Display', 'Source Sans Pro', serif;
```

#### 3. 配色要有主次

```css
/* ❌ 平均分配的颜色 */
--primary: #6366f1;
--secondary: #8b5cf6;
--accent: #ec4899;

/* ✅ 有主次的配色 */
--dominant: #0f172a;      /* 80% 面积 */
--supporting: #334155;    /* 15% 面积 */
--accent: #f59e0b;        /* 5% 点睛之笔 */
```

#### 4. 动效要有意义

```css
/* ❌ 零散的微交互 */
.button:hover { transform: scale(1.05); }
.card:hover { box-shadow: ...; }

/* ✅ 精心编排的入场动画 */
.hero-title {
  animation: fadeInUp 0.8s ease-out 0.2s both;
}
.hero-subtitle {
  animation: fadeInUp 0.8s ease-out 0.4s both;
}
.hero-cta {
  animation: fadeInUp 0.8s ease-out 0.6s both;
}
```

### 使用示例

**给 AI 的提示：**

```
帮我设计一个 SaaS 产品的落地页，要求：
- 风格：精致极简，类似 Linear.app
- 目标用户：开发者
- 核心功能：API 监控
- 要有记忆点：独特的滚动视差效果

不要用常见的紫色渐变，我想要深色主题，
用绿色作为强调色。
```

**AI 会产出：**
- 生产级代码（HTML/CSS/JS 或 React）
- 视觉上引人注目的设计
-  cohesive 的美学风格
- 精心打磨的细节

### 适合谁？

- 想要独特设计的开发者
- 受够了"AI 味"设计的人
- 需要快速产出高质量原型的团队

---

## 6. azure-observability ☁️

**安装量：61.0K** | **来源：microsoft/github-copilot-for-azure**

### 这是什么？

**Azure 监控服务使用指南** — 微软官方技能，帮你用 Azure Monitor、Application Insights 等服务监控应用。

### 什么时候用？

- 部署在 Azure 上的应用需要监控
- 排查性能问题或错误
- 设置告警和仪表板
- 写 KQL 查询语句

### 安装方法

```bash
npx skills add microsoft/github-copilot-for-azure@azure-observability
```

### 核心服务

| 服务 | 用途 | MCP 工具 | CLI 命令 |
|------|------|----------|----------|
| **Azure Monitor** | 指标、告警、仪表板 | azure__monitor | `az monitor` |
| **Application Insights** | APM、分布式追踪 | azure__applicationinsights | `az monitor app-insights` |
| **Log Analytics** | 日志查询、KQL | azure__kusto | `az monitor log-analytics` |
| **Alerts** | 通知、动作 | - | `az monitor alert` |
| **Workbooks** | 交互式报告 | azure__workbooks | - |

### 常用 KQL 查询

**查看最近错误**
```kql
AppExceptions
| where TimeGenerated > ago(1h)
| project TimeGenerated, Message, StackTrace
| order by TimeGenerated desc
```

**请求性能分析**
```kql
AppRequests
| where TimeGenerated > ago(1h)
| summarize avg(DurationMs), count() by Name
| order by avg_DurationMs desc
```

**资源使用情况**
```kql
AzureMetrics
| where TimeGenerated > ago(1h)
| where MetricName == "Percentage CPU"
| summarize avg(Average) by Resource
```

### CLI 快速参考

```bash
# 列出 Log Analytics 工作区
az monitor log-analytics workspace list --output table

# 用 KQL 查询日志
az monitor log-analytics query \
  --workspace WORKSPACE_ID \
  --analytics-query "AzureActivity | take 10"

# 列出 Application Insights
az monitor app-insights component list --output table

# 查询指标
az monitor metrics list \
  --resource RESOURCE_ID \
  --metric "Percentage CPU"
```

### 监控策略

| 监控内容 | 使用服务 | 关键指标/日志 |
|----------|----------|---------------|
| 应用错误 | App Insights | 异常、失败请求 |
| 性能 | App Insights | 响应时间、依赖调用 |
| 基础设施 | Azure Monitor | CPU、内存、磁盘 |
| 安全 | Log Analytics | 登录、审计日志 |
| 成本 | Cost Management | 预算告警 |

### 适合谁？

- Azure 用户
- DevOps 工程师
- 需要监控云应用的团队

---

## 7. skill-creator 🛠️

**安装量：49.5K** | **来源：anthropics/skills**

### 这是什么？

**技能制造机** — 帮你创建、测试、迭代自定义 AI 技能的元技能。

### 什么时候用？

- 你有个重复性工作流，想让它自动化
- 现有技能不能满足需求
- 想把自己的专业知识封装成技能
- 想为团队创建专用工具

### 安装方法

```bash
npx skills add anthropics/skills@skill-creator
```

### 创建技能的流程

```
1. 明确意图 → 2. 访谈调研 → 3. 编写草稿 → 4. 测试运行 → 5. 评估迭代 → 6. 描述优化
```

### 使用示例

**场景：创建一个"周报生成"技能**

```
你：我想创建一个技能，自动帮我写周报。

AI（skill-creator）：好的，让我先了解一下需求：

1. 周报的输入是什么？
   - Git 提交记录？
   - Jira/任务管理系统？
   - 手动输入的工作项？

2. 输出格式是什么？
   - Markdown 文档？
   - 邮件模板？
   - PPT 幻灯片？

3. 周报的读者是谁？
   - 技术团队？
   - 管理层？
   - 客户？

4. 需要包含哪些部分？
   - 本周完成？
   - 下周计划？
   - 风险/问题？
```

### 技能结构

```
my-skill/
├── SKILL.md          # 必需：技能定义
│   ├── YAML frontmatter (name, description)
│   └── Markdown 指令
├── scripts/          # 可选：可执行代码
├── references/       # 可选：参考文档
└── assets/           # 可选：模板、图标等
```

### SKILL.md 示例

```markdown
---
name: weekly-report-generator
description: 根据 Git 提交和任务系统数据生成周报。
             当用户提到"周报"、"weekly report"、"写总结"时触发。
---

## 工作流程

1. 读取本周 Git 提交记录
2. 查询 Jira 任务状态
3. 按以下结构生成报告：
   - 本周完成
   - 进行中
   - 风险/问题
   - 下周计划

## 输出格式

使用以下模板：
# 周报 - {日期}
## 本周完成
...
```

### 测试与迭代

skill-creator 会帮你：

1. **生成测试用例**：创建 2-3 个真实场景的测试提示
2. **并行运行**：同时运行"有技能"和"无技能"对比
3. **定量评估**：生成可量化的评估指标
4. **可视化结果**：用网页查看器对比输出
5. **迭代优化**：根据反馈改进技能

### 描述优化（高级）

技能描述决定了 AI 何时触发它。skill-creator 可以：

1. 生成 20 个触发测试查询（10 个应该触发，10 个不应该）
2. 自动运行优化循环
3. 找到触发率最高的描述
4. 更新技能的 frontmatter

### 适合谁？

- 高级用户（想自定义 AI 行为）
- 团队领导者（为团队创建工具）
- 技能开发者（发布技能到 ClawHub）

---

## 8. pdf 📄

**安装量：22.0K** | **来源：anthropics/skills**

### 这是什么？

**PDF 处理完全指南** — 用 Python 处理 PDF 的所有操作：读取、写入、合并、拆分、提取等。

### 什么时候用？

- 需要批量处理 PDF 文件
- 从 PDF 提取文本或表格
- 合并或拆分 PDF
- 生成 PDF 报告
- 填写 PDF 表单

### 安装方法

```bash
npx skills add anthropics/skills@pdf
```

### 核心库

| 库 | 用途 | 安装 |
|----|------|------|
| **pypdf** | 基础操作（合并、拆分、旋转） | `pip install pypdf` |
| **pdfplumber** | 文本和表格提取 | `pip install pdfplumber` |
| **reportlab** | 创建 PDF | `pip install reportlab` |
| **pytesseract** | OCR 扫描版 PDF | `pip install pytesseract pdf2image` |

### 常用操作

#### 合并 PDF

```python
from pypdf import PdfWriter, PdfReader

writer = PdfWriter()
for pdf_file in ["doc1.pdf", "doc2.pdf", "doc3.pdf"]:
    reader = PdfReader(pdf_file)
    for page in reader.pages:
        writer.add_page(page)

with open("merged.pdf", "wb") as output:
    writer.write(output)
```

#### 提取表格

```python
import pdfplumber
import pandas as pd

with pdfplumber.open("document.pdf") as pdf:
    all_tables = []
    for page in pdf.pages:
        tables = page.extract_tables()
        for table in tables:
            if table:
                df = pd.DataFrame(table[1:], columns=table[0])
                all_tables.append(df)

# 合并所有表格
if all_tables:
    combined_df = pd.concat(all_tables, ignore_index=True)
    combined_df.to_excel("extracted_tables.xlsx", index=False)
```

#### 创建 PDF

```python
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

doc = SimpleDocTemplate("report.pdf", pagesize=letter)
styles = getSampleStyleSheet()
story = []

# 添加内容
title = Paragraph("报告标题", styles['Title'])
story.append(title)
story.append(Spacer(1, 12))

body = Paragraph("这是报告正文。" * 20, styles['Normal'])
story.append(body)

# 生成 PDF
doc.build(story)
```

#### OCR 扫描版 PDF

```python
import pytesseract
from pdf2image import convert_from_path

# 转换 PDF 为图片
images = convert_from_path('scanned.pdf')

# 对每页进行 OCR
text = ""
for i, image in enumerate(images):
    text += f"第{i+1}页:\n"
    text += pytesseract.image_to_string(image, lang='chi_sim+eng')
    text += "\n\n"

print(text)
```

### 命令行工具

```bash
# 提取文本
pdftotext input.pdf output.txt

# 保留布局提取
pdftotext -layout input.pdf output.txt

# 合并 PDF
qpdf --empty --pages file1.pdf file2.pdf -- merged.pdf

# 提取图片
pdfimages -j input.pdf output_prefix
```

### 常见任务速查

| 任务 | 最佳工具 | 代码/命令 |
|------|----------|-----------|
| 合并 PDF | pypdf | `writer.add_page(page)` |
| 拆分 PDF | pypdf | 每页一个文件 |
| 提取文本 | pdfplumber | `page.extract_text()` |
| 提取表格 | pdfplumber | `page.extract_tables()` |
| 创建 PDF | reportlab | Canvas 或 Platypus |
| 命令行合并 | qpdf | `qpdf --empty --pages ...` |
| OCR | pytesseract | 先转图片再 OCR |

### 适合谁？

- 需要处理大量 PDF 的办公人员
- 数据分析师（提取 PDF 中的数据）
- 开发者（自动化 PDF 工作流）

---

## 9. next-best-practices 🚀

**安装量：21.0K** | **来源：vercel-labs/next-skills**

### 这是什么？

**Next.js 15+ 最佳实践** — Vercel 官方维护的 Next.js 开发指南，覆盖 App Router、Server Components、Server Actions 等新特性。

### 什么时候用？

- 开发新的 Next.js 项目
- 从 Pages Router 迁移到 App Router
- 优化 Next.js 应用性能
- 审查 Next.js 代码

### 安装方法

```bash
npx skills add vercel-labs/next-skills@next-best-practices
```

### 核心主题

#### 1. 文件约定

```
app/
├── layout.tsx          # 根布局
├── page.tsx            # 首页
├── blog/
│   ├── page.tsx        # /blog
│   └── [slug]/         # 动态路由
│       └── page.tsx    # /blog/[slug]
├── (marketing)/        # 路由组（不影响 URL）
└── @modal/             # 并行路由
```

#### 2. RSC 边界（Server/Client 组件）

```tsx
// ✅ 正确：Server Component（默认）
export default async function Page({ params }) {
  const data = await fetchData(params.id);
  return <ClientComponent data={data} />;
}

// ✅ 正确：Client Component（需要交互时）
'use client';
export function ClientComponent({ data }) {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// ❌ 错误：Client Component 中使用 async
'use client';
export default async function Invalid() { /* ... */ }
```

#### 3. Next.js 15+ Async 变化

```tsx
// Next.js 15+ 中这些 API 变为 async
export default async function Page({ params, searchParams }) {
  const { id } = await params;         // ← 需要 await
  const { q } = await searchParams;    // ← 需要 await
  
  // cookies() 和 headers() 也需要 await
  const cookieStore = await cookies();
}
```

#### 4. 数据获取模式

```tsx
// ✅ 推荐：Server Component 中直接 fetch
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store'  // 或 'force-cache', 'default'
  });
  return <div>{data.title}</div>;
}

// ✅ 推荐：并行获取避免瀑布
export default async function Page() {
  const [users, posts] = await Promise.all([
    fetch('/api/users'),
    fetch('/api/posts')
  ]);
  return <div>...</div>;
}

// ✅ 推荐：使用 Suspense 流式传输
import { Suspense } from 'react';
export default function Page() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <SlowComponent />
      </Suspense>
    </>
  );
}
```

#### 5. Server Actions

```tsx
// ✅ 正确：Server Action
async function updateUser(formData: FormData) {
  'use server';  // ← 标记为 Server Action
  
  const name = formData.get('name');
  await db.user.update({ name });
  revalidatePath('/users');
}

// 在表单中使用
<form action={updateUser}>
  <input name="name" />
  <button type="submit">更新</button>
</form>
```

#### 6. 图片优化

```tsx
import Image from 'next/image';

// ✅ 总是使用 next/image
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={630}
  sizes="(max-width: 768px) 100vw, 1200px"
  priority  // LCP 图片使用
  placeholder="blur"  // 模糊占位
/>
```

#### 7. 字体优化

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({ children }) {
  return (
    <html className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

### 错误处理

```tsx
// app/error.tsx
'use client';
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>出错了！</h2>
      <button onClick={reset}>重试</button>
    </div>
  );
}

// app/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h2>页面未找到</h2>
    </div>
  );
}
```

### 适合谁？

- Next.js 开发者
- 从 Pages Router 迁移到 App Router 的团队
- 需要性能优化的项目

---

## 10. brainstorming 💡

**安装量：31.4K** | **来源：obra/superpowers**

### 这是什么？

**创意→设计的协作工具** — 通过自然对话帮你把想法变成完整的设计文档。

### 什么时候用？

- 有个新功能想法，但不知道如何实现
- 项目开始前需要设计文档
- 需要探索多种方案并权衡
- 团队需要对齐设计方案

### 安装方法

```bash
npx skills add obra/superpowers@brainstorming
```

### 工作流程

```
探索项目背景 → 澄清问题 → 提出方案 → 呈现设计 → 编写文档 → 实施计划
```

### 使用示例

**场景：设计一个新的待办应用**

```
你：我想做一个待办应用。

AI（brainstorming）：好的，让我先了解一下：

1. 这个应用的主要用户是谁？
   A) 个人使用
   B) 小团队
   C) 企业客户

你：A) 个人使用

AI：明白了。那使用场景主要是？
   A) 日常工作管理
   B) 学习计划
   C) 购物清单
   D) 混合用途

你：D) 混合用途

AI：好的。技术栈有偏好吗？
   - Web 应用？
   - 移动应用？
   - 桌面应用？
   - 跨平台？

你：Web 应用，可能后续扩展到移动端

AI：收到。让我提出 3 种方案：

**方案 A：极简主义**
- 单一页面，快速添加
- 本地存储，无需后端
- 优点：开发快，加载快
- 缺点：无法多设备同步

**方案 B：全功能**
- 多列表、标签、提醒
- 云端同步
- 优点：功能完整
- 缺点：开发周期长

**方案 C：渐进式**
- 先做核心功能（添加、完成、删除）
- 本地存储起步
- 预留云端同步接口
- 优点：快速上线，可扩展
- 缺点：初期功能有限

我推荐方案 C，因为...
```

### 设计文档输出

 brainstorming 会帮你生成结构化的设计文档：

```markdown
# 待办应用设计文档

## 1. 概述
- 目标：个人多用途待办管理
- 用户：个人用户
- 平台：Web 优先

## 2. 架构
- 前端：React + TypeScript
- 状态：Zustand
- 存储：IndexedDB（后续可迁移到云端）

## 3. 核心功能
- 添加任务
- 标记完成
- 删除任务
- 分类/标签

## 4. 数据流
[图表]

## 5. 错误处理
- 本地操作失败回滚
- 同步冲突解决策略

## 6. 测试策略
- 单元测试：核心逻辑
- E2E：关键用户流程
```

### 核心原则

| 原则 | 说明 |
|------|------|
| **一次一个问题** | 不要一次性问太多 |
| **多选优先** | 给出选项比开放问题更容易回答 |
| **YAGNI** | 坚决砍掉不必要的功能 |
| **探索替代方案** | 总是提出 2-3 种方案 |
| **增量验证** | 每部分设计都要确认 |
| **灵活调整** | 不理解就回去澄清 |

### 设计文档位置

```
docs/plans/2026-02-26--todo-app-design.md
```

### 下一步

设计文档完成后，会自动调用 `writing-plans` 技能创建实施计划。

### 适合谁？

- 产品经理（梳理需求）
- 技术负责人（架构设计）
- 独立开发者（项目规划）
- 需要设计文档的团队

---

## 总结

### 按场景推荐

| 场景 | 推荐技能 |
|------|----------|
| **React 开发** | vercel-react-best-practices, next-best-practices |
| **前端设计** | frontend-design, web-design-guidelines |
| **视频制作** | remotion-best-practices |
| **PDF 处理** | pdf |
| **Azure 监控** | azure-observability |
| **创意构思** | brainstorming |
| **自定义技能** | skill-creator |
| **发现技能** | find-skills |

### 安装建议

1. **先装 find-skills** — 这是发现其他技能的入口
2. **按需安装** — 根据项目需求选择
3. **不要贪多** — 每个技能都会增加 token 消耗
4. **定期清理** — 删除不再使用的技能

### 技能管理

```bash
# 查看已安装技能
npx skills list

# 更新所有技能
npx skills update

# 删除技能
npx skills remove <skill-name>
```

### 学习资源

- 技能市场：https://skills.sh/
- ClawHub（OpenClaw 技能）：https://clawhub.com
- 官方文档：https://docs.openclaw.ai/tools/skills

---

*本文基于 skills.sh 公开数据编写，安装量数据截至 2026 年 2 月。*
