export class Game {
    constructor({ playAs }: {
        playAs: any;
    });
    _client: import("boardgame.io/dist/types/src/client/client")._ClientImpl<{
        stones: any[];
    } | undefined, Record<string, unknown>>;
    _mcts: MCTS;
    _root: {
        a: any;
        p: number;
        q: number;
        w: number;
        n: number;
        children: null;
    };
    _state: State;
    _playAs: any;
    _started: boolean;
    _stopped: boolean;
    _aiPlayer: any;
    _currentPlayer: string;
    _stateId: number;
    get currentPlayer(): string;
    get playAs(): any;
    getState(): import("boardgame.io/dist/types/src/client/client").ClientState<{
        stones: any[];
    } | undefined>;
    putStone(id: any): void;
    subscribe(f: any): () => void;
    start(): void;
    stop(): void;
    _advance(mov: any): void;
}
import { MCTS } from "./MCTS";
import { State } from "./State";
