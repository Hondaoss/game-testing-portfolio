// ===== 游戏后端模拟服务器 =====
// 用于接口测试与性能测试练习
const http = require("http");
const url = require("url");

const PORT = 3000;

// 模拟数据库
const players = {
  "1001": { id: "1001", name: "勇者小乐", level: 15, exp: 2800, gold: 4500, stamina: 50, maxStamina: 100, hp: 850, atk: 120, def: 85 },
  "1002": { id: "1002", name: "骑士小王", level: 22, exp: 8900, gold: 12300, stamina: 30, maxStamina: 100, hp: 1500, atk: 200, def: 180 },
};

const inventories = {
  "1001": [
    { id: "item_001", name: "治疗药水", type: "消耗品", qty: 5, price: 50 },
    { id: "item_002", name: "魔力药水", type: "消耗品", qty: 3, price: 80 },
    { id: "equip_001", name: "铁剑", type: "武器", atk: 25, price: 300 },
    { id: "equip_002", name: "布甲", type: "防具", def: 15, price: 200 },
  ],
  "1002": [
    { id: "item_001", name: "治疗药水", type: "消耗品", qty: 8, price: 50 },
    { id: "equip_003", name: "钢盾", type: "防具", def: 45, price: 800 },
    { id: "equip_004", name: "骑士剑", type: "武器", atk: 55, price: 1200 },
  ],
};

const shopItems = [
  { id: "item_001", name: "治疗药水", type: "消耗品", price: 50, effect: "恢复100HP" },
  { id: "item_002", name: "魔力药水", type: "消耗品", price: 80, effect: "恢复50MP" },
  { id: "equip_005", name: "青铜盔甲", type: "防具", price: 500, def: 30 },
  { id: "equip_006", name: "精铁长剑", type: "武器", price: 600, atk: 40 },
  { id: "item_003", name: "经验药水", type: "消耗品", price: 200, effect: "增加200经验" },
];

let battleCounters = { "1001": 0, "1002": 0 };
const leaderboard = [
  { id: "1002", name: "骑士小王", level: 22, score: 8900 },
  { id: "1001", name: "勇者小乐", level: 15, score: 2800 },
  { id: "1003", name: "法师阿冰", level: 18, score: 5200 },
];

function send(res, code, data) {
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" });
  res.end(JSON.stringify(data, null, 2));
}

function getBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => body += chunk);
    req.on("end", () => {
      try { resolve(JSON.parse(body)); }
      catch { resolve({}); }
    });
  });
}

function getTokenPlayer(req) {
  const token = req.headers["authorization"];
  if (!token || !token.startsWith("Bearer ")) return null;
  const pid = token.replace("Bearer player_", "");
  return players[pid] ? pid : null;
}

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const path = parsed.pathname;
  const method = req.method;

  // Health check
  if (method === "GET" && path === "/api/health") {
    return send(res, 200, { status: "ok", time: new Date().toISOString() });
  }

  // Login
  if (method === "POST" && path === "/api/login") {
    const body = await getBody(req);
    const { username, password } = body;
    if (!username || !password) return send(res, 400, { code: 400, error: "用户名和密码不能为空" });
    if (username === "test" && password === "123456") return send(res, 200, { code: 0, token: "Bearer player_1001", player: players["1001"] });
    if (username === "admin" && password === "admin123") return send(res, 200, { code: 0, token: "Bearer player_1002", player: players["1002"] });
    return send(res, 401, { code: 401, error: "用户名或密码错误" });
  }

  // Player info
  const playerMatch = path.match(/^\/api\/player\/(\d+)$/);
  if (method === "GET" && playerMatch) {
    const pid = playerMatch[1];
    if (!players[pid]) return send(res, 404, { code: 404, error: "玩家不存在" });
    return send(res, 200, { code: 0, player: players[pid] });
  }

  // Inventory
  if (method === "GET" && path === "/api/inventory") {
    const pid = getTokenPlayer(req);
    if (!pid) return send(res, 401, { code: 401, error: "未登录或token无效" });
    return send(res, 200, { code: 0, inventory: inventories[pid] || [] });
  }

  // Shop buy
  if (method === "POST" && path === "/api/shop/buy") {
    const pid = getTokenPlayer(req);
    if (!pid) return send(res, 401, { code: 401, error: "未登录" });
    const body = await getBody(req);
    const { itemId, qty = 1 } = body;
    if (!itemId) return send(res, 400, { code: 400, error: "缺少商品ID" });
    const item = shopItems.find(i => i.id === itemId);
    if (!item) return send(res, 404, { code: 404, error: "商品不存在" });
    const totalPrice = item.price * qty;
    if (players[pid].gold < totalPrice) return send(res, 400, { code: 400, error: "金币不足", need: totalPrice, have: players[pid].gold });
    players[pid].gold -= totalPrice;
    if (!inventories[pid]) inventories[pid] = [];
    const exist = inventories[pid].find(i => i.id === itemId);
    if (exist) exist.qty = (exist.qty || 1) + qty;
    else inventories[pid].push({ ...item, qty });
    return send(res, 200, { code: 0, message: "购买成功", gold: players[pid].gold });
  }

  // Battle start
  if (method === "POST" && path === "/api/battle/start") {
    const pid = getTokenPlayer(req);
    if (!pid) return send(res, 401, { code: 401, error: "未登录" });
    if (players[pid].stamina < 10) return send(res, 400, { code: 400, error: "体力不足", stamina: players[pid].stamina, need: 10 });
    players[pid].stamina -= 10;
    const expGain = Math.floor(Math.random() * 50) + 20;
    const goldGain = Math.floor(Math.random() * 30) + 10;
    players[pid].exp += expGain;
    players[pid].gold += goldGain;
    battleCounters[pid] = (battleCounters[pid] || 0) + 1;
    return send(res, 200, { code: 0, result: "胜利", expGain, goldGain, player: players[pid] });
  }

  // Leaderboard
  if (method === "GET" && path === "/api/leaderboard") {
    const sorted = [...leaderboard].sort((a, b) => b.score - a.score);
    return send(res, 200, { code: 0, leaderboard: sorted });
  }

  // Level up
  if (method === "POST" && path === "/api/player/levelup") {
    const pid = getTokenPlayer(req);
    if (!pid) return send(res, 401, { code: 401, error: "未登录" });
    const body = await getBody(req);
    const { attr } = body;
    const validAttrs = ["hp", "atk", "def"];
    if (!attr || !validAttrs.includes(attr)) return send(res, 400, { code: 400, error: "属性参数无效，可选: hp/atk/def" });
    const need = players[pid].level * 300;
    if (players[pid].exp < need) return send(res, 400, { code: 400, error: "经验不足", need, have: players[pid].exp });
    players[pid].exp -= need;
    players[pid].level += 1;
    players[pid][attr] += 15;
    return send(res, 200, { code: 0, message: "升级成功", player: players[pid] });
  }

  // 404
  send(res, 404, { code: 404, error: "接口不存在" });
});

server.listen(PORT, () => {
  console.log("==================================");
  console.log("  游戏后端模拟服务器已启动");
  console.log("  地址: http://localhost:" + PORT);
  console.log("==================================");
  console.log("  接口列表:");
  console.log("  GET  /api/health          - 健康检查");
  console.log("  POST /api/login           - 登录 test/123456");
  console.log("  GET  /api/player/{id}     - 玩家信息");
  console.log("  GET  /api/inventory       - 背包(需token)");
  console.log("  POST /api/shop/buy        - 购买(需token)");
  console.log("  POST /api/battle/start    - 战斗(需token)");
  console.log("  GET  /api/leaderboard     - 排行榜");
  console.log("  POST /api/player/levelup  - 升级(需token)");
  console.log("==================================");
});