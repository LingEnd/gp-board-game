/**
 * 游戏默认地图
 * 0:地面
 * 1:道路
 * "1":高架
 * 2:房屋
 * 3:柠檬采购点
 * 4:啤酒采购点
 * 5:苏打水采购点
 */
export const MAP_SET: MapTile[] = [
  [
    [202, 202, 1, 0, 0],
    [202, 202, 1, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  [
    [0, 4, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  [
    [0, 0, 1, 0, 0],
    [0, 3, 1, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  [
    [0, 0, 1, 0, 0],
    [0, 5, 1, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  [
    [0, 0, "1", 0, 0],
    [0, 0, "1", 0, 0],
    [1, 1, "1", 1, 1],
    [212, 212, "1", 0, 0],
    [212, 212, "1", 0, 0],
  ],
  [
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
    [204, 204, 1, 0, 0],
    [204, 204, 1, 0, 0],
  ],
  [
    [0, 0, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 216, 216, 1],
    [1, 0, 216, 216, 1],
    [1, 1, 1, 0, 0],
  ],
  [
    [1, 1, 1, 0, 0],
    [1, 3, 0, 0, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 5, 1],
    [0, 0, 1, 1, 1],
  ],
  [
    [1, 1, 1, 1, 1],
    [1, 0, 218, 218, 1],
    [1, 0, 218, 218, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 1, 1, 1],
    [0, 0, 208, 208, 1],
    [1, 0, 208, 208, 1],
    [1, 4, 0, 0, 0],
    [1, 1, 1, 0, 0],
  ],
  [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 1, 4, 0],
    [0, 0, 1, 0, 0],
  ],
  [
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 1, 215, 215],
    [0, 0, 1, 215, 215],
  ],
  [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 5, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  [
    [0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  [
    [0, 0, 1, 0, 0],
    [5, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 3, 0],
  ],
  [
    [0, 4, 1, 0, 0],
    [0, 0, 1, 0, 0],
    ["1", "1", "1", "1", "1"],
    [0, 0, 1, 0, 3],
    [0, 0, 1, 0, 0],
  ],
  [
    [210, 210, 1, 0, 0],
    [210, 210, 1, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 213, 213, 0, 0],
    [0, 213, 213, 0, 0],
  ],
  [
    [1, 1, 1, 1, 1],
    [1, 0, 205, 205, 1],
    [1, 0, 205, 205, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  [
    [1, 1, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 207, 207, 0, 0],
    [1, 207, 207, 0, 0],
    [1, 1, 1, 0, 0],
  ],
];

/**
 * 地图基础类型
 * 表示地图上格子内容
 */
export type MapBase = number | string;

/**
 * 5x5地图片类型
 */
export type MapTile = MapBase[][];

/**
 * 坐标类型
 */
export type Position = [number, number];

/**
 * 地图类型
 */
export type Map = MapBase[][];

/**
 * 地图尺寸类型  [宽,高,地图片宽,地图片高]
 */
export type MapSize = [number, number, number, number];

/**
 * 4个坐标类型
 * 用于表示地图上相邻的4个格子
 * [左上,右上,左下,右下]
 */
type Position4 = [Position, Position, Position, Position];

/**
 * 旋转地图
 * @param {MapTile} tile 旋转的地图
 * @param {String} towards 旋转方向
 * @returns {MapTile} 旋转后的地图
 */
export function rotate(tile: MapTile, towards: number): MapTile {
  if (towards === 1) return tile;
  const temp: MapTile = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      switch (towards) {
        case 2:
          temp[i][j] = tile[4 - j][i];
          break;
        case 3:
          temp[i][j] = tile[4 - i][4 - j];
          break;
        case 4:
          temp[i][j] = tile[j][4 - i];
          break;
        default:
          break;
      }
    }
  }
  return temp;
}

/**
 * 根据地图块编号和地图宽度求解位置
 * @param {number} rol 地图宽度
 * @param {number} id 地图块编号
 * @returns {Position} 位置
 */
export function solveId(rol: number, id: number): Position {
  return [id % rol, Math.floor(id / rol)];
}

/**
 * 根据玩家数量返回地图尺寸
 * @param {number} numPlayer 玩家数量
 * @returns {number} 地图尺寸
 * [y,x,ty,tx]
 */
export function solveMapSize(numPlayer: number): MapSize {
  switch (numPlayer) {
    case 2: {
      return [15, 15, 3, 3];
    }
    case 3: {
      return [15, 20, 3, 4];
    }
    case 4: {
      return [20, 20, 4, 4];
    }
    case 5: {
      return [20, 25, 4, 5];
    }
    default: {
      return [15, 15, 3, 3];
    }
  }
}

/**
 * 判断地块是否可以用作开设第一家餐厅
 * @param {Map} maps 游戏地图
 * @param {number} mapSize 地图尺寸
 * @param {Position} position 地块坐标
 * @param {Door} door 餐厅门方向
 * @returns {false | Position[]} false | 餐厅四个地块坐标
 */
export function canStartRestaurant(
  maps: Map,
  mapSize: MapSize,
  position: Position,
  door: 0 | 1 | 2 | 3 = 0
): false | Position4 {
  console.log("x", position[0], "y", position[1]);
  let restaurant = canSetRestaurant(maps, mapSize, position, door);
  if (restaurant) {
    //  检查同板块内是否有其他餐厅门
    const ys = restaurant[door][1] - (restaurant[door][1] % 5);
    const xs = restaurant[door][0] - (restaurant[door][0] % 5);
    for (let y = ys; y < ys + 5; y++)
      for (let x = xs; x < xs + 5; x++)
        if (
          typeof maps[y][x] === "string" &&
          (maps[y][x] as string).includes("d")
        )
          restaurant = false;
  }
  return restaurant;
}

/**
 * 判断地块是否在地图边缘
 * @param {Map} maps 地图
 * @param {MapSize} mapSize 地图尺寸
 * @param {Position} position 位置
 * @returns
 */
export function isUnreachable(
  maps: Map,
  mapSize: MapSize,
  position: Position
): number | false {
  return nextSpots(mapSize, position).findIndex((spot) => {
    if (spot)
      return maps[spot[1]][spot[0]] === 1 || maps[spot[1]][spot[0]] === "1";
    else return false;
  });
}

/**
 * 判断餐厅是否能放置
 * @param {Map} maps 地图
 * @param {MapSize} mapSize 地图尺寸
 * @param {Position} position 位置
 * @param {0 | 1 | 2 | 3} door 门的位置
 * @returns {false | Position[]} false | 餐厅四个地块坐标
 */
export function canSetRestaurant(
  maps: Map,
  mapSize: MapSize,
  position: Position,
  door: 0 | 1 | 2 | 3 = 0
): Position4 | false {
  const restaurant = canPut2x2(maps, mapSize, position);
  if (restaurant && isUnreachable(maps, mapSize, restaurant[door]) !== -1)
    return restaurant;
  else return false;
}

/**
 * 判断是否可以放置2x2板块
 * @param {Map} maps 地图
 * @param {MapSize} mapSize 地图尺寸
 * @param {Position} position 位置
 * @returns {Position4 | false} 可以放置返回4个格子的坐标, 不能放置返回false
 */
export function canPut2x2(
  maps: Map,
  mapSize: MapSize,
  position: Position
): Position4 | false {
  //  判断是否下边缘
  if (position[0] === mapSize[1] - 1) return false;
  //  判断是否右边缘
  if (position[1] === mapSize[0] - 1) return false;
  //  建立2x2板块
  let tile: Position4 = [
    [position[0], position[1]],
    [position[0], position[1] + 1],
    [position[0] + 1, position[1]],
    [position[0] + 1, position[1] + 1],
  ];
  //  判断是否四格都是空地
  if (tile.map((spot) => maps[spot[1]][spot[0]] === 0).includes(false))
    return false;
  else return tile;
}

/**
 * 放置餐厅
 * @param {Array} maps G.maps
 * @param {string} token 标记内容
 * @param {number[][]} restaurant 餐厅位置
 * @param {number} door 餐厅朝向  0:左上 1:右上 2:左下 3:右下
 * @function 将token放置在选定位置,door指定的位置为"token door"以确定朝向
 */
export function setRestaurant(
  maps: Map,
  token: MapBase,
  restaurant: Position4,
  door: 0 | 1 | 2 | 3 = 0
): void {
  restaurant.forEach((spot, index) => {
    if (index === door) maps[spot[1]][spot[0]] = token + "d";
    else maps[spot[1]][spot[0]] = token;
  });
}

/**
 * 将token放置在选定位置
 * @param {Array} maps G.maps
 * @param {string} token 标记内容
 * @param {number|number[]} positions 标记位置
 */
export function setTokens(
  maps: Map,
  token: MapBase,
  positions: Position[]
): void {
  positions.forEach((spot) => (maps[spot[1]][spot[0]] = token));
}
/**
 * 将token放置在选定位置
 * @param {Array} maps G.maps
 * @param {string} token 标记内容
 * @param {number|number[]} positions 标记位置
 */
export function setToken(maps: Map, token: MapBase, positions: Position): void {
  maps[positions[1]][positions[0]] = token;
}

/**
 * 判断是否在地图边缘
 * @param {MapSize} mapSize 地图尺寸
 * @param {Position} position 位置
 * @returns {number | false}
 * 11:地图左边缘 22:地图右边缘 33:地图上边缘 44:地图下边缘
 * 1:板块左边缘 2:板块右边缘 3:板块上边缘 4:板块下边缘
 * false:不在边缘
 */
export function isEdge(mapSize: MapSize, position: Position): number | false {
  const temp = [0, 0];
  if (position[1] === 0) temp[0] = 11;
  else if (position[1] === mapSize[0] - 1) temp[0] = 22;
  else {
    const y = position[1] % 5;
    if (y === 0) temp[0] = 1;
    else if (y === 4) temp[0] = 2;
  }
  if (position[0] === 0) temp[1] = 33;
  else if (position[0] === mapSize[1] - 1) temp[1] = 44;
  else {
    const x = position[0] % 5;
    if (x === 0) temp[1] = 3;
    else if (x === 4) temp[1] = 4;
  }
  if (temp[0] || temp[1]) {
    const column: string = temp[0] === 0 ? "" : temp[0].toString();
    const row: string = temp[1] === 0 ? "" : temp[1].toString();
    return parseInt(column + row);
  }
  return false;
}

/**
 * 找出给定坐标的相邻点
 * @param {MapSize} mapSize 地图尺寸
 * @param {Position} position 位置
 * @returns {[Position | false, Position | false, Position | false, Position | false]}
 * 返回上下左右四个点, 如果不存在则返回false
 */
export function nextSpots(
  mapSize: MapSize,
  position: Position
): [Position | false, Position | false, Position | false, Position | false] {
  const top: false | Position =
    position[0] - 1 < 0 ? false : [position[0] - 1, position[1]];
  const buttom: false | Position =
    position[0] + 1 >= mapSize[0] ? false : [position[0] + 1, position[1]];
  const left: false | Position =
    position[1] - 1 < 0 ? false : [position[0], position[1] - 1];
  const right: false | Position =
    position[1] + 1 >= mapSize[1] ? false : [position[0], position[1] + 1];
  const rt: [
    Position | false,
    Position | false,
    Position | false,
    Position | false,
  ] = [top, buttom, left, right];
  return rt;
}

//TODO add description
export function isReachable(
  maps: Map,
  mapSize: MapSize,
  start: Position,
  end: Position
): Position[] | false {
  const open = new Array(0);
  const close = new Array(0);
  let currentCost = 0;
  type Node = {
    spot: Position;
    id: number;
    cost: number;
    F: number;
    parent: Node | null;
  };
  let current: Node = {
    spot: start,
    id: getID(mapSize, start),
    cost: currentCost,
    F: getF(start, 0, end),
    parent: null,
  };
  open.push(current);
  while (open.length) {
    current = open.pop();
    close.push({
      id: current.id,
      spot: current.spot,
      parent: current.parent,
    });
    currentCost = current.cost + 10;
    // 获取current的相邻节点 [上,下,左,右]
    // 超出地图边界的点将被返回为false
    const next = nextSpots(mapSize, current.spot);
    for (let index = 0; index < 4; index++) {
      const spot = next[index];
      if (spot) {
        let id = getID(mapSize, spot);
        // 判断节点spot是不是目标节点end,如果是,搜索成功
        if (spot[0] === end[0] && spot[1] === end[1]) {
          const rt = [];
          while (current.parent) {
            rt.push(current.spot);
            current = current.parent;
          }
          return rt;
        }
        // 非障碍
        //TODO决定全等判断还是相等判断
        if (maps[spot[1]][spot[0]] !== 1 && maps[spot[1]][spot[0]] !== "1")
          continue;
        // 非高架转弯
        if (
          //有父级
          current.parent &&
          // 中心点
          current.spot[0] % 5 === 2 &&
          current.spot[1] % 5 === 2 &&
          // 高架
          maps[current.spot[1]][current.spot[0]] === "1" &&
          // 转弯
          maps[current.parent.spot[1]][current.parent.spot[0]] !==
            maps[spot[1]][spot[0]]
        )
          continue;
        // 不在close中
        else if (
          //eslint-disable-next-line
          close.find((Spot) => Spot.id === id && Spot.parent.id === current.id)
        )
          continue;
        // 可以创建节点的情况
        else {
          const exist = open.findIndex((Spot) => Spot.id === id);
          // 已在open中,判断当前cost小则改变节点父级并更新cost
          if (exist !== -1) {
            if (open[exist].cost > currentCost) {
              open[exist].cost = currentCost;
              open[exist].parent = current;
            }
          }
          // 不在open中则添加
          else
            open.push({
              spot: spot,
              id: id,
              cost: currentCost,
              F: getF(spot, currentCost, end),
              parent: current,
            });
        }
      }
    }
    // 重新排序将曼哈顿系数最低的节点向后调整
    open.sort((a, b) => b.F - a.F);
  }
  return false;
}
//TODO add description
export function getF(spot: Position, cost: number, end: Position): number {
  return getG(spot, end) + cost;
}
//TODO add description
export function getG(spot1: Position, spot2: Position): number {
  return (
    Math.abs(spot1[0] - spot2[0]) * 10 + Math.abs(spot1[1] - spot2[1]) * 10
  );
}
//TODO add description
export function getID(mapSize: MapSize, spot: Position): number {
  return spot[1] * mapSize[1] + spot[0];
}

// 用来分辨道路转向的函数，暂不决定在哪里使用
// export function whatRoad(
//   maps: Map,
//   mapSize: MapSize,
//   position: Position
// ): string {
//   let roadType = "s";
//   const next = nextSpots(mapSize, position).map((spot) =>
//     spot ? maps[spot[1]][spot[0]] : null
//   );
//   if (next[0] === "1" && next[1] === "1" && next[2] === 1 && next[3] === 1)
//     roadType = "s";
//   else if (next[0] === 1 && next[1] === 1 && next[2] === "1" && next[3] === "1")
//     roadType = "r";
//   else if (next[0] === 1 && next[1] === 1 && next[2] === 1 && next[3] === 1)
//     roadType = "c";
//   else if (
//     (next[0] === 1 || next[0] === "1") &&
//     (next[1] === 1 || next[1] === "1") &&
//     (next[2] === 1 || next[2] === "1")
//   )
//     roadType = "lt";
//   else if (
//     (next[0] === 1 || next[0] === "1") &&
//     (next[1] === 1 || next[1] === "1") &&
//     (next[3] === 1 || next[3] === "1")
//   )
//     roadType = "rt";
//   else if (
//     (next[0] === 1 || next[0] === "1") &&
//     (next[2] === 1 || next[2] === "1") &&
//     (next[3] === 1 || next[3] === "1")
//   )
//     roadType = "tt";
//   else if (
//     (next[1] === 1 || next[1] === "1") &&
//     (next[2] === 1 || next[2] === "1") &&
//     (next[3] === 1 || next[3] === "1")
//   )
//     roadType = "t";
//   else if (
//     (next[0] === 1 || next[0] === "1") &&
//     (next[2] === 1 || next[2] === "1")
//   )
//     roadType = "j";
//   else if (
//     (next[0] === 1 || next[0] === "1") &&
//     (next[3] === 1 || next[3] === "1")
//   )
//     roadType = "l";
//   else if (
//     (next[1] === 1 || next[1] === "1") &&
//     (next[2] === 1 || next[2] === "1")
//   )
//     roadType = "tl";
//   else if (
//     (next[1] === 1 || next[1] === "1") &&
//     (next[3] === 1 || next[3] === "1")
//   )
//     roadType = "tr";
//   else if (
//     (next[0] === 1 || next[0] === "1") &&
//     (next[1] === 1 || next[1] === "1")
//   )
//     roadType = "s";
//   else if (
//     (next[2] === 1 || next[2] === "1") &&
//     (next[3] === 1 || next[3] === "1")
//   )
//     roadType = "r";
//   else if (next[0] === 1 || next[0] === "1") roadType = "ot";
//   else if (next[1] === 1 || next[1] === "1") roadType = "ob";
//   else if (next[2] === 1 || next[2] === "1") roadType = "ol";
//   else if (next[3] === 1 || next[3] === "1") roadType = "or";
//   return roadType;
// }
