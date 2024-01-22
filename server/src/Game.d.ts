import type { Game } from "boardgame.io";
import company from "./resources/company";
import { EMPLOYEES } from "./resources/Employees";
import { Map, MapSize } from "./resources/Map";
type player = Record<string, number | null>;
export interface FCMState {
    maps: Map;
    mapSize: MapSize;
    bank: number;
    companys: Record<string, typeof company>;
    billboards: number;
    employeeLeft: typeof EMPLOYEES;
    players: Record<string, player>;
    turnOrder: string[];
    slot: number;
    achievements: Record<string, boolean>;
}
export declare const FCM: Game<FCMState>;
export declare const TicTacToe: Game;
export {};
