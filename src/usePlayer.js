import { useEffect, useRef, useState } from 'react';
import { createPlayer } from './core/player.js';

/** Binds a framework-free player to React state; a new player is created per token list. */
export function usePlayer(tokens, initialWpm) {
  const wpmRef = useRef(initialWpm);
  const [player, setPlayer] = useState(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    const p = createPlayer(tokens, { wpm: wpmRef.current });
    setPlayer(p);
    setState(p.getState());
    const unsubscribe = p.subscribe((s) => {
      wpmRef.current = s.wpm;
      setState(s);
    });
    return () => {
      unsubscribe();
      p.destroy();
    };
  }, [tokens]);

  return { player, state };
}
