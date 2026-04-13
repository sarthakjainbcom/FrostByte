import { GAME_TUNING } from '@/lib/game/config';
import type { MatchRuntimeState } from '@/lib/game/types';

export function callCrewAssist(state: MatchRuntimeState, actorId: string) {
  const actor = state.fighters.find((fighter) => fighter.playerId === actorId);
  if (!actor || !actor.alive) return;

  const enemies = state.fighters.filter((fighter) => fighter.team !== actor.team && fighter.alive);
  enemies.forEach((enemy) => {
    enemy.percent += GAME_TUNING.assistDamage;
    enemy.velocity.x += actor.facing * GAME_TUNING.assistKnockback;
    enemy.stunMs += 180;
    state.events.push({
      atMs: state.nowMs,
      type: 'assist-called',
      actorId,
      targetId: enemy.playerId,
      value: GAME_TUNING.assistDamage,
      note: 'Crew Assist',
    });
  });
}
