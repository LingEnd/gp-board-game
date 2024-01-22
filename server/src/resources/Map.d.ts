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
export declare const MAP_SET: MapTile[];
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
export declare function rotate(tile: MapTile, towards: number): MapTile;
/**
 * 根据地图块编号和地图宽度求解位置
 * @param {number} rol 地图宽度
 * @param {number} id 地图块编号
 * @returns {Position} 位置
 */
export declare function solveId(rol: number, id: number): Position;
/**
 * 根据玩家数量返回地图尺寸
 * @param {number} numPlayer 玩家数量
 * @returns {number} 地图尺寸
 * [y,x,ty,tx]
 */
export declare function solveMapSize(numPlayer: number): MapSize;
/**
 * 判断地块是否可以用作开设第一家餐厅
 * @param {Map} maps 游戏地图
 * @param {number} mapSize 地图尺寸
 * @param {Position} position 地块坐标
 * @param {Door} door 餐厅门方向
 * @returns {false | Position[]} false | 餐厅四个地块坐标
 */
export declare function canStartRestaurant(maps: Map, mapSize: MapSize, position: Position, door?: 0 | 1 | 2 | 3): false | Position4;
/**
 * 判断地块是否在地图边缘
 * @param {Map} maps 地图
 * @param {MapSize} mapSize 地图尺寸
 * @param {Position} position 位置
 * @returns
 */
export declare function isUnreachable(maps: Map, mapSize: MapSize, position: Position): number | false;
/**
 * 判断餐厅是否能放置
 * @param {Map} maps 地图
 * @param {MapSize} mapSize 地图尺寸
 * @param {Position} position 位置
 * @param {0 | 1 | 2 | 3} door 门的位置
 * @returns {false | Position[]} false | 餐厅四个地块坐标
 */
export declare function canSetRestaurant(maps: Map, mapSize: MapSize, position: Position, door?: 0 | 1 | 2 | 3): Position4 | false;
/**
 * 判断是否可以放置2x2板块
 * @param {Map} maps 地图
 * @param {MapSize} mapSize 地图尺寸
 * @param {Position} position 位置
 * @returns {Position4 | false} 可以放置返回4个格子的坐标, 不能放置返回false
 */
export declare function canPut2x2(maps: Map, mapSize: MapSize, position: Position): Position4 | false;
/**
 * 放置餐厅
 * @param {Array} maps G.maps
 * @param {string} token 标记内容
 * @param {number[][]} restaurant 餐厅位置
 * @param {number} door 餐厅朝向  0:左上 1:右上 2:左下 3:右下
 * @function 将token放置在选定位置,door指定的位置为"token door"以确定朝向
 */
export declare function setRestaurant(maps: Map, token: MapBase, restaurant: Position4, door?: 0 | 1 | 2 | 3): void;
/**
 * 将token放置在选定位置
 * @param {Array} maps G.maps
 * @param {string} token 标记内容
 * @param {number|number[]} positions 标记位置
 */
export declare function setTokens(maps: Map, token: MapBase, positions: Position[]): void;
/**
 * 将token放置在选定位置
 * @param {Array} maps G.maps
 * @param {string} token 标记内容
 * @param {number|number[]} positions 标记位置
 */
export declare function setToken(maps: Map, token: MapBase, positions: Position): void;
/**
 * 判断是否在地图边缘
 * @param {MapSize} mapSize 地图尺寸
 * @param {Position} position 位置
 * @returns {number | false}
 * 11:地图左边缘 22:地图右边缘 33:地图上边缘 44:地图下边缘
 * 1:板块左边缘 2:板块右边缘 3:板块上边缘 4:板块下边缘
 * false:不在边缘
 */
export declare function isEdge(mapSize: MapSize, position: Position): number | false;
/**
 * 找出给定坐标的相邻点
 * @param {MapSize} mapSize 地图尺寸
 * @param {Position} position 位置
 * @returns {[Position | false, Position | false, Position | false, Position | false]}
 * 返回上下左右四个点, 如果不存在则返回false
 */
export declare function nextSpots(mapSize: MapSize, position: Position): [Position | false, Position | false, Position | false, Position | false];
export declare function isReachable(maps: Map, mapSize: MapSize, start: Position, end: Position): Position[] | false;
export declare function getF(spot: Position, cost: number, end: Position): number;
export declare function getG(spot1: Position, spot2: Position): number;
export declare function getID(mapSize: MapSize, spot: Position): number;
export {};
