import { NextResponse } from 'next/server';
import { createMatchRuntime, stepMatchRuntime } from '@/lib/game/engine';
import type { InputFrame } from '@/lib/game/types';

export async function POST(request: Request) {
  const body = (await request.json()) as {
    fighterIds?: [string, string];
    frames?: { dtMs: number; inputs: InputFrame[] }[];
  };

  const fighterIds = body.fighterIds ?? ['storm-captain', 'inferno-chef'];
  const frames = body.frames ?? [];

  const runtime = createMatchRuntime('sim-1', fighterIds);
  frames.forEach((frame) => stepMatchRuntime(runtime, frame));

  return NextResponse.json({
    ok: true,
    phase: runtime.phase,
    nowMs: runtime.nowMs,
    fighters: runtime.fighters,
    events: runtime.events,
  });
}
