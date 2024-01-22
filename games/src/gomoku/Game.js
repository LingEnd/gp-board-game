import { Client } from "boardgame.io/client";
import { MCTS, Node } from "./MCTS";
import { MCEvaluator } from "./Evals";
import { State } from "./State";
import { Gomoku } from "./GameDef.js";

export class Game {
  constructor({ playAs }) {
    this._client = Client({ game: Gomoku });
    this._mcts = new MCTS({
      evaluator: MCEvaluator(),
      useNoise: false,
      maxIteration: 3200 * 2,
    });
    this._root = Node(null);
    this._state = new State({ boardSize: 9 });
    this._playAs = playAs;
    this._started = false;
    this._stopped = false;
    this._aiPlayer = { 0: "1", 1: "0" }[this._playAs];
    this._currentPlayer = this.getState().ctx.currentPlayer;
    this._stateId = this.getState()._stateID - 1;
  }

  get currentPlayer() {
    return this._currentPlayer;
  }

  get playAs() {
    return this._playAs;
  }

  getState() {
    return this._client.getState();
  }

  putStone(id) {
    if (!this._started || this._stopped) return;
    if (this._playAs && this._playAs !== this.currentPlayer) return;
    this._client.moves.putStone(id);
  }

  subscribe(f) {
    return this._client.subscribe(f);
  }

  start() {
    if (this._started || this._stopped) return;

    this._client.subscribe((s) => {
      this._currentPlayer = s.ctx.currentPlayer;

      let moves = (s.deltalog || [])
        .filter((log) => log.action.type === "MAKE_MOVE")
        .map((log) => log.action.payload.args[0]);
      for (let mov of moves) {
        this._advance(mov);
      }

      if (s.ctx.gameover) return;
      if (s._stateID === this._stateId) return;

      this._stateId = s._stateID;

      if (this._aiPlayer === s.ctx.currentPlayer) {
        this._mcts.exec(this._root, this._state).then((result) => {
          if (this._stopped) return;

          this._client.moves.putStone(result.bestChild.a);
        });
      }
    });

    this._client.start();

    this._started = true;
  }

  stop() {
    this._client.stop();
    this._mcts.stop();
    this._stopped = true;
  }

  _advance(mov) {
    this._state.makeMove(mov);
    let root = this._root;
    if (!root.children) root = Node(mov);
    else if (root.children.length === 0)
      throw new Error("try to make move on terminal node");
    else root = root.children.find((c) => c.a === mov);
    this._root = root;
  }
}
