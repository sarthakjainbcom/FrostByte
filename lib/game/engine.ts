import { GAME_TUNING } from '@/lib/game/config';
import { fighterRuntimeDefs } from '@/lib/game/fighter-defs';
import { callCrewAssist } from '@/lib/game/systems/assists';
import { applyTimers, performStrike, performUltimate } from '@/lib/game/systems/combat';
import { stepHazards } from '@/lib/game/systems/hazards';
import { applyJump, applyMovement, isOutOfBounds, stepPhysics } from '@/lib/game/systems/physics';
import type { FighterRuntimeState, MatchRuntimeState, StepRequest } from '@/lib/game/types';

function buildDefaultStage() {
  return {
    id: 'sunken-coliseum-runtime',
    floorY: 0,
    blastZone: { left: -2400, right: 2400, top: -1800, bottom: 1200 },
    hazards: [
      {
        id: 'hz-thunder-column',
        name: 'Thunder Column',
        intervalMs: 4000,
        radius: 360,
        center: { x: 200, y: 0 },
        knockback: 1.2,
        damage: 6,
        nextTriggerAtMs: 4000,
      },
    ],
  };
}

export function createMatchRuntime(matchId: string, fighterIds: [string, string]): MatchRuntimeState {
  const [fighterA, fighterB] = fighterIds;
  if (!fighterRuntimeDefs[fighterA] || !fighterRuntimeDefs[fighterB]) {
    throw new Error('Unknown fighter IDs for runtime creation');
  }

  const baseState = (playerId: string, fighterId: string, team: 1 | 2, x: number): FighterRuntimeState => ({
    playerId,
    fighterId,
    team,
    position: { x, y: 0 },
    velocity: { x: 0, y: 0 },
    facing: team === 1 ? 1 : -1,
    percent: 0,
    stocks: GAME_TUNING.stockCount,
    grounded: true,
    stunMs: 0,
    invulnMs: 0,
    ultimateMeter: 0,
    lastHitAtMs: null,
    comboCount: 0,
    comboDamage: 0,
    shield: GAME_TUNING.maxShield,
    alive: true,
  });

  return {
    id: matchId,
    phase: 'countdown',
    nowMs: 0,
    endsAtMs: GAME_TUNING.matchDurationMs,
    countdownEndsAtMs: GAME_TUNING.countdownMs,
    fighters: [baseState('P1', fighterA, 1, -300), baseState('P2', fighterB, 2, 300)],
    stage: buildDefaultStage(),
    events: [{ atMs: 0, type: 'phase-changed', note: 'countdown' }],
    seed: 42,
  };
}

function resolveKO(state: MatchRuntimeState, fighter: FighterRuntimeState) {
  fighter.stocks -= 1;
  state.events.push({ atMs: state.nowMs, type: 'ko', targetId: fighter.playerId, value: fighter.stocks });

  if (fighter.stocks <= 0) {
    fighter.alive = false;
    return;
  }

  fighter.position = { x: fighter.team === 1 ? -320 : 320, y: -260 };
  fighter.velocity = { x: 0, y: 0 };
  fighter.percent = 0;
  fighter.invulnMs = 1200;
  fighter.grounded = false;
}

function updatePhase(state: MatchRuntimeState) {
  if (state.phase === 'countdown' && state.nowMs >= state.countdownEndsAtMs) {
    state.phase = 'live';
    state.events.push({ atMs: state.nowMs, type: 'phase-changed', note: 'live' });
  }

  if (state.phase === 'live' && state.nowMs >= state.endsAtMs) {
    state.phase = 'sudden-death';
    state.events.push({ atMs: state.nowMs, type: 'phase-changed', note: 'sudden-death' });
  }

  const aliveTeams = new Set(state.fighters.filter((fighter) => fighter.alive).map((fighter) => fighter.team));
  if (aliveTeams.size <= 1 && state.phase !== 'finished') {
    state.phase = 'finished';
    state.events.push({ atMs: state.nowMs, type: 'phase-changed', note: 'finished' });
  }
}

export function stepMatchRuntime(state: MatchRuntimeState, request: StepRequest) {
  state.nowMs += request.dtMs;
  const inputByPlayer = Object.fromEntries(request.inputs.map((input) => [input.playerId, input]));

  state.fighters.forEach((fighter) => {
    if (!fighter.alive) return;
    const input = inputByPlayer[fighter.playerId] ?? {
      playerId: fighter.playerId,
      moveX: 0,
      jump: false,
      dodge: false,
      light: false,
      heavy: false,
      special: false,
      ultimate: false,
    };

    const def = fighterRuntimeDefs[fighter.fighterId];
    applyTimers(fighter, request.dtMs);

    if (state.phase !== 'live' && state.phase !== 'sudden-death') {
      stepPhysics(fighter, state.stage, request.dtMs, def.gravityScale);
      return;
    }

    if (fighter.stunMs <= 0) {
      applyMovement(fighter, request.dtMs, input.moveX, def.baseSpeed);
      applyJump(fighter, input.jump, def.jumpForce);

      if (input.dodge) fighter.invulnMs = Math.max(fighter.invulnMs, GAME_TUNING.dodgeInvulnMs);

      const enemies = state.fighters.filter((other) => other.playerId !== fighter.playerId && other.team !== fighter.team && other.alive);
      if (input.light) performStrike({ nowMs: state.nowMs, attacker: fighter, attackerDef: def, targets: enemies, type: 'light', events: state.events });
      if (input.heavy) performStrike({ nowMs: state.nowMs, attacker: fighter, attackerDef: def, targets: enemies, type: 'heavy', events: state.events });
      if (input.special) callCrewAssist(state, fighter.playerId);
      if (input.ultimate) performUltimate({ nowMs: state.nowMs, attacker: fighter, targets: enemies, events: state.events });
    }

    stepPhysics(fighter, state.stage, request.dtMs, def.gravityScale);

    if (isOutOfBounds(fighter, state.stage)) {
      resolveKO(state, fighter);
    }

    if (fighter.lastHitAtMs && state.nowMs - fighter.lastHitAtMs > GAME_TUNING.comboGraceMs) {
      fighter.comboCount = 0;
      fighter.comboDamage = 0;
    }
  });

  if (state.phase === 'live' || state.phase === 'sudden-death') stepHazards(state);
  updatePhase(state);

  state.events = state.events.slice(-120);
  return state;
}
