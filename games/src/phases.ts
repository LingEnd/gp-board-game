import { FnContext, PhaseMap } from "boardgame.io";
import { FCMState } from "./Game";
import { setReverse, startRestaurant, byPass, restructure } from "./moves";
import { EMPLOYEES } from "./resources/Employees";

export const phases: PhaseMap<FCMState> = {
  startBusiness1: {
    start: true,
    moves: { startRestaurant, byPass },
    turn: {
      order: {
        // 反转顺序
        playOrder: ({ G }) => [...G.turnOrder].reverse(),
        first: ({}) => 0,
        next: ({ ctx }) => {
          if (ctx.playOrderPos < ctx.playOrder.length - 1) {
            return ctx.playOrderPos + 1;
          }
        },
      },
      minMoves: 1,
      maxMoves: 1,
    },
    next: "startBusiness2",
  },
  startBusiness2: {
    moves: { startRestaurant },
    endIf: ({ G }) => {
      if (!Object.values(G.companys).every((company) => company.started))
        return false;
      return true;
    },
    turn: {
      order: {
        playOrder: ({ G }) => {
          const playerStarted = Object.values(G.companys).map(
            (company, index) => {
              if (company.started) return index.toString();
            }
          );
          const order = G.turnOrder.filter((player) => {
            if (!playerStarted.includes(player)) return player;
          });
          return order;
        },
        first: ({}) => 0,
        next: ({ ctx }) => (ctx.playOrderPos + 1) % ctx.numPlayers,
      },
      minMoves: 1,
      maxMoves: 1,
    },
    next: "chooseReverse",
  },
  chooseReverse: {
    endIf: ({ G, ctx }) => {
      for (let index = 0; index < ctx.numPlayers; index++) {
        if (G.players[index].bankReserve === null) return false;
      }
      return true;
    },
    turn: {
      activePlayers: {
        all: "setReverse",
        minMoves: 1,
        maxMoves: 1,
      },
      stages: {
        setReverse: {
          moves: { setReverse },
        },
      },
    },
    next: "restructuring",
  },
  restructuring: {
    turn: {
      minMoves: 1,
      maxMoves: 1,
      activePlayers: {
        all: "restructuring",
      },
      stages: {
        restructuring: {
          moves: {
            restructure,
          },
        },
      },
    },
    next: "working",
  },
  working: {
    onBegin: ({ G, ctx }) => {
      const currentOrder = ctx.playOrder;
      const companys = G.companys;
      let playerID: keyof typeof companys;
      const slotsLeft: Record<string, number> = {};
      for (playerID in companys) {
        // 计算空位
        slotsLeft[playerID] =
          companys[playerID].working.filter((item) => item === "").length +
          (G.companys[playerID].achieve.FIRST_AIRPLANE_CAMPAIGN ? 2 : 0);
        const WorkerCount = {
          Regional_Manager: 0,
          Luxuries_Manager: 0,
          Zeppelin_Pilot: 0,
          CFO: 0,
          Brand_Director: 0,
          Burger_Chef: 0,
          Pizza_Chef: 0,
          Executive_Vice_President: 0,
          Guru: 0,
          HR_Director: 0,
          Local_Manager: 0,
          Discount_Manager: 0,
          Cart_Operator: 0,
          Truck_Driver: 0,
          New_Business_Developer: 0,
          Campaign_Manager: 0,
          Brand_Manager: 0,
          Burger_Cook: 0,
          Pizza_Cook: 0,
          Vice_President: 0,
          Senior_Vice_President: 0,
          Coach: 0,
          Recruiting_Manager: 0,
          Pricing_Manager: 0,
          Errand_Boy: 0,
          Waitress: 0,
          Marketing_Trainee: 0,
          Kitchen_Trainee: 0,
          Junior_Vice_President: 0,
          Trainer: 0,
          Recruiting_Girl: 0,
          Management_Trainee: 0,
          CEO: 1,
        };
        G.companys[playerID].working.forEach((item) => {
          if (item !== "") {
            if (WorkerCount[item]) {
              WorkerCount[item] += 1;
            } else {
              WorkerCount[item] = 1;
            }
          }
        });
        if (WorkerCount.Pricing_Manager > 0) {
          G.companys[playerID].price -= WorkerCount.Pricing_Manager;
        }
        if (WorkerCount.Discount_Manager > 0) {
          G.companys[playerID].price -= WorkerCount.Discount_Manager * 3;
        }
        if (WorkerCount.Luxuries_Manager > 0) {
          G.companys[playerID].price += WorkerCount.Brand_Director * 10;
        }
        if (WorkerCount.Recruiting_Manager > 0) {
          G.companys[playerID].extraHire += WorkerCount.Recruiting_Manager * 2;
        }
        if (WorkerCount.HR_Director > 0) {
          G.companys[playerID].extraHire += WorkerCount.HR_Director * 4;
        }
      }
      currentOrder.sort((a, b) => {
        if (slotsLeft[a] === slotsLeft[b])
          return currentOrder.indexOf(a) - currentOrder.indexOf(b);
        return slotsLeft[b] - slotsLeft[a];
      });
      G.turnOrder = currentOrder;
    },
    turn: {
      order: {
        playOrder: ({ G }) => G.turnOrder,
        first: ({}) => 0,
        next: ({ ctx }) => (ctx.playOrderPos + 1) % ctx.numPlayers,
      },
    },
    moves: {},
  },
  end: {},
};
