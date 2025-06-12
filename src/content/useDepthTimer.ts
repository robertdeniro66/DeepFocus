import { useEffect, useRef, useState } from 'react';
import { calculateDepth, DepthInfo } from '../utils/depth';

export function useDepthTimer(paused: boolean, idleTimeoutSec: number, onIdle: () => void): [DepthInfo, boolean] {
  const [elapsed, setElapsed] = useState(0);
  const [idle, setIdle] = useState(false);
  const lastActive = useRef(Date.now());
  const timer = useRef<NodeJS.Timeout | null>(null);

  // Reset timer on user activity
  useEffect(() => {
    function handleActivity() {
      lastActive.current = Date.now();
      if (idle) setIdle(false);
    }
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('mousedown', handleActivity);
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('mousedown', handleActivity);
    };
  }, [idle]);

  // Main timer
  useEffect(() => {
    if (paused || idle) {
      if (timer.current) clearInterval(timer.current);
      return;
    }
    timer.current = setInterval(() => {
      const now = Date.now();
      if (now - lastActive.current > idleTimeoutSec * 1000) {
        setIdle(true);
        onIdle();
        return;
      }
      setElapsed(e => e + 1);
    }, 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, idle, idleTimeoutSec, onIdle]);

  // Reset on idle
  useEffect(() => {
    if (idle) setElapsed(0);
  }, [idle]);

  return [calculateDepth(elapsed), idle];
} 