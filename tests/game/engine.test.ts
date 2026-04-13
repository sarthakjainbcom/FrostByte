import { createMatchRuntime, stepMatchRuntime } from '@/lib/game/engine';

describe('game runtime engine', () => {
  it('moves countdown to live phase', () => {
    const runtime = createMatchRuntime('m1', ['storm-captain', 'inferno-chef']);
    stepMatchRuntime(runtime, { dtMs: 3001, inputs: [] });
    expect(runtime.phase).toBe('live');
  });

  it('applies strike damage and combo count', () => {
    const runtime = createMatchRuntime('m2', ['storm-captain', 'inferno-chef']);
    stepMatchRuntime(runtime, { dtMs: 3001, inputs: [] });

    runtime.fighters[0].position.x = 0;
    runtime.fighters[1].position.x = 20;

    stepMatchRuntime(runtime, {
      dtMs: 100,
      inputs: [
        { playerId: 'P1', moveX: 0, jump: false, dodge: false, light: true, heavy: false, special: false, ultimate: false },
        { playerId: 'P2', moveX: 0, jump: false, dodge: false, light: false, heavy: false, special: false, ultimate: false },
      ],
    });

    expect(runtime.fighters[1].percent).toBeGreaterThan(0);
    expect(runtime.fighters[0].comboCount).toBeGreaterThan(0);
  });

  it('fires ultimate when meter full', () => {
    const runtime = createMatchRuntime('m3', ['storm-captain', 'inferno-chef']);
    stepMatchRuntime(runtime, { dtMs: 3001, inputs: [] });
    runtime.fighters[0].ultimateMeter = 100;

    stepMatchRuntime(runtime, {
      dtMs: 16,
      inputs: [
        { playerId: 'P1', moveX: 0, jump: false, dodge: false, light: false, heavy: false, special: false, ultimate: true },
        { playerId: 'P2', moveX: 0, jump: false, dodge: false, light: false, heavy: false, special: false, ultimate: false },
      ],
    });

    expect(runtime.fighters[0].ultimateMeter).toBe(0);
    expect(runtime.events.some((event) => event.type === 'ultimate-fired')).toBe(true);
  });
});
