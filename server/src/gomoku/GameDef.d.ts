export namespace Gomoku {
    let name: string;
    function setup(): {
        stones: any[];
    };
    namespace moves {
        function putStone({ G, ctx }: {
            G: any;
            ctx: any;
        }, id: any): "INVALID_MOVE" | undefined;
    }
    namespace turn {
        let moveLimit: number;
    }
    function endIf({ G, ctx }: {
        G: any;
        ctx: any;
    }): {
        winner: any;
        draw?: undefined;
    } | {
        draw: boolean;
        winner?: undefined;
    } | undefined;
    namespace ai {
        function enumerate({ G, ctx }: {
            G: any;
            ctx: any;
        }): {
            move: string;
            args: number[];
        }[];
    }
}
