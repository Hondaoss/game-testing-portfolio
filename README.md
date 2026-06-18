# 🎮 游戏测试作品集 — Game Testing Portfolio

## 项目：Flare RPG 核心系统测试

> **Flare**（github.com/flareteam/flare-engine）是一款开源动作RPG游戏，包含角色成长、装备、战斗、任务等完整系统。本作品集以此项目为对象，展示完整的游戏测试流程。

---

### 测试范围
| 模块 | 说明 |
|------|------|
| 主界面 | 冷启动、按钮响应、分辨率适配 |
| 角色创建 | 职业选择（力士/斥候/法师）、名称输入（正常/空/超长/特殊字符）、创建/取消 |
| ESC菜单 | 保存并退出、取消返回游戏 |
| 存档系统 | 列表展示、载入完整性、删除（确认/取消）、多存档冲突 |

### 测试概况
- 测试用例总数：25条
- 测试类型：功能测试 18条 / 边界测试 3条 / 异常测试 2条 / 兼容性测试 1条
- 缺陷分级：P0（致命）/ P1（严重）/ P2（一般）

### 工具与技术
| 类型 | 工具/方法 |
|------|-----------|
| 测试设计 | 等价类划分、边界值分析 |
| 测试类型 | 功能测试、兼容性测试、边界测试、异常测试 |
| AI辅助 | 使用 Codex/ChatGPT 辅助生成用例、优化Bug描述、分析日志 |
| 文档管理 | Excel（用例管理）、Git/GitHub（版本管理） |

### 文件结构
```
game-testing-portfolio/
+-- README.md
+-- test-cases/
|   +-- Flare主界面与功能测试用例.xlsx
+-- bug-reports/（待补充）
+-- summary/（待补充）
```

### 项目时间
2026.06 - 至今（持续更新中）

### 相关链接
- [Flare Engine GitHub](https://github.com/flareteam/flare-engine)
- [Flare Game GitHub](https://github.com/flareteam/flare-game)
