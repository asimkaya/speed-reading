import { useEffect, useRef, useState } from 'react';
import { createPlayer } from './core/player.js';

/** Binds a framework-free player to React state; a new player is created per token list. */
export function usePlayer(tokens, options) {
  const optionsRef = useRef(options);
  optionsRef.current = options;
  const [player, setPlayer] = useState(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    const p = createPlayer(tokens, optionsRef.current);
    setPlayer(p);
    setState(p.getState());
    const unsubscribe = p.subscribe(setState);
    return () => {
      unsubscribe();
      p.destroy();
    };
  }, [tokens]);

  useEffect(() => {
    player?.setSoftStart(options.softStart);
  }, [player, options.softStart]);

  return { player, state };
}
