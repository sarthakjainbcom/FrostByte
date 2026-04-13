'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import fighters from '@/data/fighters.json';
import { buildSimpleBotInput, createMatchRuntime, mapKeysToPlayerInput, stepMatchRuntime } from '@/lib/game';
import type { MatchRuntimeState } from '@/lib/game';

const STAGE_WIDTH = 920;
const STAGE_HEIGHT = 420;
const WORLD_LEFT = -2400;
const WORLD_RIGHT = 2400;
const WORLD_TOP = -1800;
const WORLD_BOTTOM = 1200;

const toStageX = (x: number) => ((x - WORLD_LEFT) / (WORLD_RIGHT - WORLD_LEFT)) * STAGE_WIDTH;
const toStageY = (y: number) => ((y - WORLD_TOP) / (WORLD_BOTTOM - WORLD_TOP)) * STAGE_HEIGHT;

function getFighterName(fighterId: string) {
  return fighters.find((entry) => entry.id === fighterId)?.codename ?? fighterId;
}

export default function RuntimePage() {
  const [runtime, setRuntime] = useState<MatchRuntimeState>(() => createMatchRuntime('browser-runtime', ['storm-captain', 'inferno-chef']));
  const [running, setRunning] = useState(false);
  const keysRef = useRef<Set<string>>(new Set());
  const rafRef = useRef<number | null>(null);
  const prevTsRef = useRef<number | null>(null);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      keysRef.current.add(event.code);
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) event.preventDefault();
    };

    const up = (event: KeyboardEvent) => {
      keysRef.current.delete(event.code);
    };

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  useEffect(() => {
    if (!running) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      prevTsRef.current = null;
      return;
    }

    const tick = (ts: number) => {
      if (prevTsRef.current == null) prevTsRef.current = ts;
      const dt = Math.min(48, ts - prevTsRef.current);
      prevTsRef.current = ts;

      setRuntime((current) => {
        if (current.phase === 'finished') return current;
        const next = structuredClone(current);
        const p1 = next.fighters[0];
        const p2 = next.fighters[1];
        const p1Input = mapKeysToPlayerInput('P1', keysRef.current);
        const p2Input = buildSimpleBotInput(p1.position.x, p2.position.x, p1.position.x - p2.position.x);
        stepMatchRuntime(next, { dtMs: Math.max(8, Math.round(dt)), inputs: [p1Input, p2Input] });
        return next;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running]);

  const reset = () => {
    setRuntime(createMatchRuntime('browser-runtime', ['storm-captain', 'inferno-chef']));
    setRunning(false);
  };

  const players = useMemo(
    () =>
      runtime.fighters.map((fighter) => ({
        ...fighter,
        label: getFighterName(fighter.fighterId),
        x: toStageX(fighter.position.x),
        y: toStageY(fighter.position.y),
      })),
    [runtime.fighters],
  );

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-4xl font-black">Playable Web Sandbox</h1>
        <p className="text-muted">Control P1 directly in your browser. P2 is bot-driven. This is an in-browser prototype loop built on the runtime engine.</p>
      </header>

      <section className="grid gap-4 rounded border border-white/10 bg-ocean/20 p-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="relative overflow-hidden rounded-lg border border-white/20 bg-gradient-to-b from-slate-900 to-slate-800" style={{ width: '100%', maxWidth: STAGE_WIDTH, height: STAGE_HEIGHT }}>
            <div className="absolute inset-x-0 bottom-14 h-1 bg-cyan/60" />
            {players.map((player) => (
              <div
                key={player.playerId}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded border px-2 py-1 text-xs font-bold ${player.playerId === 'P1' ? 'border-gold bg-red/90' : 'border-cyan bg-indigo-500/90'}`}
                style={{ left: `${player.x}px`, top: `${player.y}px` }}
              >
                {player.playerId} · {Math.round(player.percent)}%
              </div>
            ))}
            {runtime.stage.hazards.map((hazard) => (
              <div
                key={hazard.id}
                className="absolute rounded-full border border-red/70 bg-red/20"
                style={{
                  width: `${(hazard.radius / (WORLD_RIGHT - WORLD_LEFT)) * STAGE_WIDTH * 2}px`,
                  height: `${(hazard.radius / (WORLD_RIGHT - WORLD_LEFT)) * STAGE_WIDTH * 2}px`,
                  left: `${toStageX(hazard.center.x)}px`,
                  top: `${toStageY(hazard.center.y)}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
          </div>
        </div>

        <aside className="space-y-3">
          <p className="text-sm"><strong>Phase:</strong> {runtime.phase}</p>
          <p className="text-sm"><strong>Timer:</strong> {(runtime.nowMs / 1000).toFixed(2)}s</p>
          <div className="flex gap-2">
            <button className="rounded bg-red px-3 py-2 font-bold" onClick={() => setRunning((value) => !value)}>
              {running ? 'Pause' : 'Start'}
            </button>
            <button className="rounded border border-white/30 px-3 py-2" onClick={reset}>Reset</button>
          </div>
          <div className="text-xs text-muted">
            <p className="font-semibold text-ivory">Controls (P1)</p>
            <p>Move: A/D or ←/→</p>
            <p>Jump: W / ↑ / Space</p>
            <p>Light: J</p>
            <p>Heavy: K</p>
            <p>Special (Crew Assist): L</p>
            <p>Ultimate: I</p>
            <p>Dodge: Shift</p>
          </div>
        </aside>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {players.map((player) => (
          <article key={player.playerId} className="rounded border border-white/10 p-4">
            <h2 className="font-bold">{player.playerId} — {player.label}</h2>
            <p>Stocks: {player.stocks}</p>
            <p>Damage: {player.percent.toFixed(1)}%</p>
            <p>Meter: {player.ultimateMeter.toFixed(1)}</p>
            <p>Combo: {player.comboCount}</p>
          </article>
        ))}
      </section>

      <section className="rounded border border-white/10 p-4">
        <h2 className="mb-2 font-bold">Recent Events</h2>
        <ul className="max-h-60 space-y-1 overflow-auto text-sm">
          {runtime.events.slice(-25).reverse().map((event, idx) => (
            <li key={`${event.type}-${event.atMs}-${idx}`}>
              [{event.atMs}ms] {event.type}
              {event.actorId ? ` ${event.actorId}` : ''}
              {event.targetId ? ` -> ${event.targetId}` : ''}
              {event.value !== undefined ? ` (${event.value})` : ''}
              {event.note ? ` · ${event.note}` : ''}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
