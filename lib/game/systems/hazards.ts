import type { MatchRuntimeState } from '@/lib/game/types';

export function stepHazards(state: MatchRuntimeState) {
  const nowMs = state.nowMs;

  state.stage.hazards.forEach((hazard) => {
    if (nowMs < hazard.nextTriggerAtMs) return;

    hazard.nextTriggerAtMs = nowMs + hazard.intervalMs;

    state.fighters.forEach((fighter) => {
      if (!fighter.alive) return;
      const dx = fighter.position.x - hazard.center.x;
      const dy = fighter.position.y - hazard.center.y;
      const distSq = dx * dx + dy * dy;
      if (distSq > hazard.radius * hazard.radius) return;

      fighter.percent += hazard.damage;
      fighter.velocity.y -= hazard.knockback;
      fighter.velocity.x += dx >= 0 ? hazard.knockback * 0.7 : -hazard.knockback * 0.7;

      state.events.push({
        atMs: nowMs,
        type: 'hazard-hit',
        actorId: hazard.id,
        targetId: fighter.playerId,
        value: hazard.damage,
        note: hazard.name,
      });
    });
  });
}
