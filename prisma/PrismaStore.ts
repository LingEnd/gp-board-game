import { PrismaClient } from "@prisma/client";
import { LogEntry, Server, State, StorageAPI } from "boardgame.io";
import { Async } from "boardgame.io/internal";

export class PrismaStore extends Async {
  private _Prisma;

  constructor(prisma: PrismaClient) {
    super();
    this._Prisma = prisma;
  }

  async connect(): Promise<void> {}

  // async createMatch(
  //   id,
  //   {
  //     initialState,
  //     metadata: {
  //       gameName,
  //       players,
  //       setupData,
  //       gameover,
  //       nextMatchID,
  //       unlisted,
  //     },
  //   }
  // ) {
  //   await match_1.Match.create({
  //     id,
  //     gameName,
  //     players,
  //     setupData,
  //     gameover,
  //     nextRoomID: nextMatchID,
  //     unlisted,
  //     initialState,
  //     state: initialState,
  //     log: [],
  //   });
  // }

  async createMatch(
    id: string,
    {
      initialState,
      metadata: {
        gameName,
        players,
        setupData,
        gameover,
        nextMatchID,
        unlisted,
      },
    }: StorageAPI.CreateMatchOpts
  ): Promise<void> {
    await this._Prisma.game.create({
      data: {
        id,
        name: gameName,
        players,
        setupData,
        gameover,
        nextRoomID: nextMatchID,
        unlisted,
        initialState: initialState as any,
        state: initialState as any,
        log: [],
      },
    });
  }

  // createGame(matchID, opts) {
  //   return this.createMatch(matchID, opts);
  // }

  createGame(matchID: string, opts: StorageAPI.CreateGameOpts): Promise<void> {
    return this.createMatch(matchID, opts);
  }

  // async setState(id, state, deltalog) {
  //   await this._sequelize.transaction(async (transaction) => {
  //     var _a;
  //     const match = await match_1.Match.findByPk(id, {
  //       transaction,
  //     });
  //     const previousState =
  // match === null || match === void 0 ? void 0 : match.state;
  //     if (!previousState || previousState._stateID < state._stateID) {
  //       await match_1.Match.upsert(
  //         {
  //           id,
  //           state,
  //           log: [
  //             ...((_a =
  //               match === null || match === void 0 ? void 0 : match.log) !==
  //               null && _a !== void 0
  //               ? _a
  //               : []),
  //             ...(deltalog !== null && deltalog !== void 0 ? deltalog : []),
  //           ],
  //         },
  //         { transaction }
  //       );
  //     }
  //   });
  // }

  async setState(
    id: string,
    state: State,
    deltalog?: LogEntry[]
  ): Promise<void> {
    const previousState = await this._Prisma.game.findUnique({
      where: { id },
      select: { state: true },
    });
    // @ts-ignore
    if (!previousState || previousState.state._stateID < state._stateID) {
      await this._Prisma.game.update({
        where: { id },
        data: {
          state: state as any,
          log: {
            create: deltalog,
          } as any,
        },
      });
    }
  }

  // async setMetadata(
  //   id,
  //   {
  //     gameName,
  //     players,
  //     setupData,
  //     gameover,
  //     nextMatchID,
  //     unlisted,
  //     createdAt,
  //     updatedAt,
  //   }
  // ) {
  //   await match_1.Match.upsert({
  //     id,
  //     gameName,
  //     players,
  //     setupData,
  //     gameover,
  //     nextRoomID: nextMatchID,
  //     unlisted,
  //     createdAt: createdAt ? new Date(createdAt) : undefined,
  //     updatedAt: updatedAt ? new Date(updatedAt) : undefined,
  //   });
  // }

  async setMetadata(
    id: string,
    {
      gameName,
      players,
      setupData,
      gameover,
      nextMatchID,
      unlisted,
      createdAt,
      updatedAt,
    }: Server.MatchData
  ): Promise<void> {
    await this._Prisma.game.upsert({
      where: { id },
      create: {
        id,
        name: gameName,
        players,
        setupData,
        gameover,
        nextRoomID: nextMatchID,
        unlisted,
        createdAt: createdAt ? new Date(createdAt) : undefined,
        updatedAt: updatedAt ? new Date(updatedAt) : undefined,
      },
      update: {
        name: gameName,
        players,
        setupData,
        gameover,
        nextRoomID: nextMatchID,
        unlisted,
        createdAt: createdAt ? new Date(createdAt) : undefined,
        updatedAt: updatedAt ? new Date(updatedAt) : undefined,
      },
    });
  }

  // async fetch(matchID, { state, log, metadata, initialState }) {
  //   const result = {};
  //   const match = await match_1.Match.findByPk(matchID);
  //   if (!match) {
  //     return result;
  //   }
  //   if (metadata) {
  //     result.metadata = {
  //       gameName: match.gameName,
  //       players: match.players || [],
  //       setupData: match.setupData,
  //       gameover: match.gameover,
  //       nextMatchID: match.nextRoomID,
  //       unlisted: match.unlisted,
  //       createdAt: match.createdAt.getTime(),
  //       updatedAt: match.updatedAt.getTime(),
  //     };
  //   }
  //   if (initialState) {
  //     result.initialState = match.initialState;
  //   }
  //   if (state) {
  //     result.state = match.state;
  //   }
  //   if (log) {
  //     result.log = match.log;
  //   }
  //   return result;
  // }
  async fetch<O extends StorageAPI.FetchOpts>(
    matchID: string,
    { state, log, metadata, initialState }: O
  ): Promise<StorageAPI.FetchResult<O>> {
    const result = {} as StorageAPI.FetchResult<O>;
    const match = await this._Prisma.game.findUnique({
      where: { id: matchID },
    });

    if (!match) {
      return result;
    }
    if (metadata) {
      // @ts-ignore
      result.metadata = {
        gameName: match.name,
        players: match.players || [],
        setupData: match.setupData,
        gameover: match.gameover,
        nextMatchID: match.nextRoomID,
        unlisted: match.unlisted,
        createdAt: match.createdAt.getTime(),
        updatedAt: match.updatedAt.getTime(),
      };
    }
    if (initialState) {
      // @ts-ignore
      result.initialState = match.initialState as any;
    }
    if (state) {
      // @ts-ignore
      result.state = match.state as any;
    }
    if (log) {
      // @ts-ignore
      result.log = match.log;
    }
    return result;
  }

  // async wipe(id) {
  //   await match_1.Match.destroy({ where: { id } });
  // }

  async wipe(id: string): Promise<void> {
    await this._Prisma.game.delete({
      where: { id },
    });
  }

  //   export interface ListMatchesOpts {
  //     gameName?: string;
  //     where?: {
  //         isGameover?: boolean;
  //         updatedBefore?: number;
  //         updatedAfter?: number;
  //     };
  // }

  async listMatches(opts?: StorageAPI.ListMatchesOpts): Promise<string[]> {
    const where = opts?.where || {};
    const gameName = opts?.gameName;
    const isGameover = where.isGameover;
    const updatedBefore = where.updatedBefore;
    const updatedAfter = where.updatedAfter;
    const query = this._Prisma.game.findMany({
      where: {
        name: gameName,
        // @ts-ignore
        gameover: isGameover,
        updatedAt: {
          gte: updatedAfter ? new Date(updatedAfter) : undefined,
          lte: updatedBefore ? new Date(updatedBefore) : undefined,
        },
      },
      select: { id: true },
    });
    const matches = await query;
    return matches.map((match) => match.id);
  }

  // listGames(opts) {
  //   return this.listMatches(opts);
  // }

  listGames(opts?: StorageAPI.ListGamesOpts): Promise<string[]> {
    return this.listMatches(opts);
  }
}
