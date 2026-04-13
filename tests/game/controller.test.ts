import { buildSimpleBotInput, mapKeysToPlayerInput } from '@/lib/game/controller';

describe('controller input mapping', () => {
  it('maps movement and attacks for player one', () => {
    const keys = new Set(['KeyA', 'KeyJ', 'KeyK', 'ShiftLeft']);
    const frame = mapKeysToPlayerInput('P1', keys);
    expect(frame.moveX).toBe(-1);
    expect(frame.light).toBe(true);
    expect(frame.heavy).toBe(true);
    expect(frame.dodge).toBe(true);
  });

  it('bot moves toward target when far', () => {
    const bot = buildSimpleBotInput(500, 0, 500);
    expect(bot.playerId).toBe('P2');
    expect(bot.moveX).toBe(1);
  });
});
