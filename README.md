# 🎮 游戏测试作品集 — Game Testing Portfolio

## 一、Flare RPG 客户端功能测试
Flare（github.com/flareteam/flare-engine）开源动作RPG游戏。
- 测试用例：**77条** | 覆盖13个模块 | Bug报告：4条
- [test-cases](test-cases) | [bug-reports](bug-reports) | [summary](summary)

## 二、游戏后端API接口测试
本地Node.js游戏后端模拟服务器，Postman进行接口与性能测试。
- 覆盖接口：7个（登录/玩家/背包/商城/战斗/排行榜/升级）
- 测试用例：**30条**（Excel文档） | Postman请求：30条
- 测试场景：正常流程 / 异常参数 / 边界条件 / 鉴权校验

### 接口测试覆盖
| 接口 | 用例数 | 覆盖内容 |
|------|--------|----------|
| 登录 | 5 | 正确/密码错/用户不存在/缺参/空参 |
| 玩家信息 | 4 | 存在/不同玩家/不存在ID/非法参数 |
| 背包 | 2 | 有token/无token鉴权 |
| 商城购买 | 7 | 正常买/买多个/金币不足/商品不存在/无token/缺参 |
| 战斗 | 4 | 正常/无token/体力不足/连续战斗 |
| 排行榜 | 3 | 查看/刷新对比/公开访问 |
| 升级加点 | 4 | 加攻击/加生命/无效属性/无token |
| 健康检查 | 1 | 服务器状态 |

- [api-test/server.js](api-test/server.js)
- [api-test/游戏后端API接口测试用例.xlsx](api-test/游戏后端API接口测试用例.xlsx)
- [api-test/游戏后端接口测试.postman_collection.json](api-test/游戏后端接口测试.postman_collection.json)

---

**工具：** Postman | Postman Runner | Node.js | Git/GitHub | Codex/ChatGPT
**项目时间：** 2026.06 - 至今

[Flare Engine](https://github.com/flareteam/flare-engine) | [Flare Game](https://github.com/flareteam/flare-game)
