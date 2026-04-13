import { GAME_TUNING } from '@/lib/game/config';
import type { CombatEvent, FighterRuntimeDef, FighterRuntimeState } from '@/lib/game/types';

function distanceSq(a: FighterRuntimeState, b: FighterRuntimeState): number {
  const dx = a.position.x - b.position.x;
  const dy = a.position.y - b.position.y;
  return dx * dx + dy * dy;
}

export function applyTimers(fighter: FighterRuntimeState, dtMs: number) {
  fighter.stunMs = Math.max(0, fighter.stunMs - dtMs);
  fighter.invulnMs = Math.max(0, fighter.invulnMs - dtMs);
}

export function performStrike(params: {
  nowMs: number;
  attacker: FighterRuntimeState;
  attackerDef: FighterRuntimeDef;
  targets: FighterRuntimeState[];
  type: 'light' | 'heavy' | 'special';
  events: CombatEvent[];
}) {
  const { nowMs, attacker, attackerDef, targets, type, events } = params;
  const range = type === 'light' ? 320 : type === 'heavy' ? 420 : 520;
  const baseDamage = type === 'light' ? attackerDef.baseDamage : type === 'heavy' ? attackerDef.baseDamage * 1.6 : attackerDef.baseDamage * 1.25;

  targets.forEach((target) => {
    if (!target.alive || target.invulnMs > 0) return;
    if (distanceSq(attacker, target) > range * range) return;

    const knockback = GAME_TUNING.baseKnockback + baseDamage * 0.03 + target.percent * GAME_TUNING.knockbackScaling;
    target.percent += baseDamage;
    target.stunMs += baseDamage * GAME_TUNING.hitStunPerDamage;
    target.velocity.x += attacker.facing * knockback;
    target.velocity.y -= knockback * 0.6;
    attacker.ultimateMeter = Math.min(GAME_TUNING.ultimateMeterMax, attacker.ultimateMeter + attackerDef.ultimateChargePerHit);

    const comboWindow = attackerDef.comboWindowMs;
    if (attacker.lastHitAtMs && nowMs - attacker.lastHitAtMs <= comboWindow) {
      attacker.comboCount += 1;
      attacker.comboDamage += baseDamage;
      events.push({ atMs: nowMs, type: 'combo-extended', actorId: attacker.playerId, targetId: target.playerId, value: attacker.comboCount });
    } else {
      attacker.comboCount = 1;
      attacker.comboDamage = baseDamage;
    }

    attacker.lastHitAtMs = nowMs;
    events.push({ atMs: nowMs, type: 'hit', actorId: attacker.playerId, targetId: target.playerId, value: Math.round(baseDamage), note: type });
  });
}

export function performUltimate(params: {
  nowMs: number;
  attacker: FighterRuntimeState;
  targets: FighterRuntimeState[];
  events: CombatEvent[];
}) {
  const { nowMs, attacker, targets, events } = params;
  if (attacker.ultimateMeter < GAME_TUNING.ultimateMeterMax) return;
  attacker.ultimateMeter = 0;

  targets.forEach((target) => {
    if (!target.alive) return;
    target.percent += GAME_TUNING.ultimateDamage;
    target.velocity.x += attacker.facing * GAME_TUNING.ultimateBaseKnockback;
    target.velocity.y -= GAME_TUNING.ultimateBaseKnockback;
    target.stunMs += 650;
    events.push({ atMs: nowMs, type: 'ultimate-fired', actorId: attacker.playerId, targetId: target.playerId, value: GAME_TUNING.ultimateDamage });
  });
}
