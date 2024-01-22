export function MCEvaluator() {
  return async function evaluator(ss) {
    await new Promise((resolve) => setImmediate(resolve));
    return ss.map((s) => {
      const boardSize = 9;
      const acts = s.legalMoves();
      const v = randomPlay(s.clone(), acts);
      const p = new Array(boardSize * boardSize).fill(0);

      for (let i = 0; i < acts.length; i++) p[acts[i]] = 1 / acts.length;

      return {
        value: v,
        probs: p,
      };
    });
  };
}

function randomPlay(st, acts) {
  const p = st.currentPlayer;
  let gameover = st.gameover();

  for (let i = 0; i < acts.length && !gameover; i++) {
    const j = i + Math.floor(Math.random() * (acts.length - i));
    const x = acts[j];
    acts[j] = acts[i];
    acts[i] = x;

    gameover = st.makeMove(x).gameover();
  }

  if (p === gameover.winner) return 1;
  else if (gameover.draw) return 0;
  return -1;
}
