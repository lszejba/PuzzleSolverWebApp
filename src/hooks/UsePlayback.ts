import { useRef, useCallback } from "react";
import { useGameStore } from "../store/GameStore";

export function usePlayback(delayMs = 800) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { timeline, goTo } = useGameStore();
  const { cursor, states } = timeline;

  const isPlaying = intervalRef.current !== null;
  const canUndo = cursor >= 0;
  const canRedo = cursor < states.length - 1;

  const pause = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    if (intervalRef.current !== null) return;
    intervalRef.current = setInterval(() => {
      const { timeline } = useGameStore.getState();
      if (timeline.cursor >= timeline.states.length - 1) {
        pause();
        return;
      }
      goTo(timeline.cursor + 1);
    }, delayMs);
  }, [delayMs, goTo, pause]);

  return { play, pause, isPlaying, canUndo, canRedo };
}
