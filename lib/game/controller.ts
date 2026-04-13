import type { InputFrame } from './types';

export type KeyState = Set<string>;

function has(keys: KeyState, ...options: string[]) {
  return options.some((option) => keys.has(option));
}

export function mapKeysToPlayerInput(playerId: string, keys: KeyState): InputFrame {
  const left = has(keys, 'KeyA', 'ArrowLeft');
  const right = has(keys, 'KeyD', 'ArrowRight');
  const moveX: -1 | 0 | 1 = left && !right ? -1 : right && !left ? 1 : 0;

  return {
    playerId,
    moveX,
    jump: has(keys, 'KeyW', 'ArrowUp', 'Space'),
    dodge: has(keys, 'ShiftLeft', 'ShiftRight', 'Slash'),
    light: has(keys, 'KeyJ', 'Period'),
    heavy: has(keys, 'KeyK', 'Comma'),
    special: has(keys, 'KeyL', 'Semicolon'),
    ultimate: has(keys, 'KeyI', 'Quote'),
  };
}

export function buildSimpleBotInput(targetX: number, selfX: number, distance: number): InputFrame {
  const moveX: -1 | 0 | 1 = Math.abs(distance) < 80 ? 0 : selfX < targetX ? 1 : -1;
  const attackWindow = Math.abs(distance) < 340;

  return {
    playerId: 'P2',
    moveX,
    jump: Math.abs(distance) < 120,
    dodge: Math.random() > 0.96,
    light: attackWindow && Math.random() > 0.78,
    heavy: attackWindow && Math.random() > 0.9,
    special: Math.random() > 0.985,
    ultimate: Math.random() > 0.997,
  };
}
