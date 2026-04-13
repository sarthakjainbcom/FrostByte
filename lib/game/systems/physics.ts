import { GAME_TUNING } from '@/lib/game/config';
import type { FighterRuntimeState, StageRuntime } from '@/lib/game/types';

export function applyMovement(fighter: FighterRuntimeState, dtMs: number, moveX: -1 | 0 | 1, speed: number) {
  const dt = dtMs;
  if (moveX !== 0) {
    fighter.velocity.x += moveX * speed * 0.01 * dt;
    fighter.facing = moveX;
  } else if (fighter.grounded) {
    fighter.velocity.x *= 0.84;
  }
}

export function applyJump(fighter: FighterRuntimeState, jump: boolean, jumpForce: number) {
  if (jump && fighter.grounded) {
    fighter.velocity.y = -jumpForce;
    fighter.grounded = false;
  }
}

export function stepPhysics(fighter: FighterRuntimeState, stage: StageRuntime, dtMs: number, gravityScale: number) {
  const dt = dtMs;
  fighter.velocity.y = Math.min(fighter.velocity.y + GAME_TUNING.gravity * gravityScale * dt, GAME_TUNING.maxFallSpeed);
  fighter.position.x += fighter.velocity.x;
  fighter.position.y += fighter.velocity.y;

  if (fighter.position.y >= stage.floorY) {
    fighter.position.y = stage.floorY;
    fighter.velocity.y = 0;
    fighter.grounded = true;
  }

  fighter.shield = Math.min(GAME_TUNING.maxShield, fighter.shield + (GAME_TUNING.shieldRegenPerSec * dt) / 1000);
}

export function isOutOfBounds(fighter: FighterRuntimeState, stage: StageRuntime): boolean {
  const { left, right, top, bottom } = stage.blastZone;
  return fighter.position.x < left || fighter.position.x > right || fighter.position.y < top || fighter.position.y > bottom;
}
