# 🎮 游戏测试作品集 — Game Testing Portfolio

## 项目：Flare RPG 核心系统测试

> **Flare**（github.com/flareteam/flare-engine）是一款开源动作RPG游戏，包含角色成长、装备、战斗、任务等完整系统。

---

### 测试范围
| 模块 | 用例数 | 说明 |
|------|--------|------|
| 主界面 | 3 | 冷启动、按钮响应、分辨率适配 |
| 角色创建 | 14 | 职业选择、名称输入（正常/空/超长/特殊字符）、创建/取消、死亡不可复活 |
| ESC菜单 | 2 | 保存并退出、取消返回 |
| 存档系统 | 6 | 列表展示、载入完整性、删除、多存档 |
| 游戏内HUD | 4 | HUD展示、加载动画 |
| 角色移动 | 7 | 鼠标点击、路径寻路、WASD控制、障碍物阻挡 |
| 新手引导 | 1 | 引导流程完整性 |
| 战斗系统 | 10 | 基础攻击、技能释放、受击反馈、击杀掉落、HP/MP回复 |
| 装备系统 | 11 | 掉落、穿戴/卸下、属性变化、装备对比、职业限制、异常拖拽 |
| 背包系统 | 11 | 拾取、堆叠、使用消耗品、丢弃、排序、满包边界 |
| 设置系统 | 3 | 音量、画面、按键设置 |
| 死亡系统 | 2 | 复活机制、装备物品保留 |
| 升级系统 | 3 | 经验获取、升级属性变化、属性分配 |

### 测试概况
- 测试用例总数：**77条**
- 覆盖模块：13个
- 缺陷分级：P0（致命）/ P1（严重）/ P2（一般）

### 项目时间
2026.06 - 至今（持续更新中）

### 链接
- [test-cases/Flare主界面与功能测试用例.xlsx](https://github.com/Hondaoss/game-testing-portfolio/blob/master/test-cases/Flare%E4%B8%BB%E7%95%8C%E9%9D%A2%E4%B8%8E%E5%8A%9F%E8%83%BD%E6%B5%8B%E8%AF%95%E7%94%A8%E4%BE%8B.xlsx)
- [Flare Engine](https://github.com/flareteam/flare-engine) | [Flare Game](https://github.com/flareteam/flare-game)
