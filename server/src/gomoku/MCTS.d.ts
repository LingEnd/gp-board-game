export function Node(a: any): {
    a: any;
    p: number;
    q: number;
    w: number;
    n: number;
    children: null;
};
export class MCTS {
    constructor({ evaluator, maxIteration, maxTime, useNoise }: {
        evaluator: any;
        maxIteration: any;
        maxTime: any;
        useNoise: any;
    });
    _eval: any;
    _maxIteration: any;
    _maxTime: any;
    _batch: Set<any>;
    _batchSize: number;
    _useNoise: any;
    _searching: boolean;
    _timer: NodeJS.Timeout | null;
    exec(root: any, state: any, opts: any): Promise<{
        bestChild: any;
        actionProbs: any;
    }>;
    _stop: boolean | undefined;
    stop(): void;
    _step(root: any, st: any): Promise<void>;
    _flush(): Promise<void>;
}
