import fighters from '@/data/fighters.json';
import type { FighterRuntimeDef, RuntimeArchetype } from './types';

const asArchetype = (value: string): RuntimeArchetype => {
  if (value === 'Rushdown' || value === 'Zoner' || value === 'Grappler' || value === 'Trickster' || value === 'Bruiser') return value;
  return 'Bruiser';
};

export const fighterRuntimeDefs: Record<string, FighterRuntimeDef> = Object.fromEntries(
  fighters.map((f) => {
    const speed = f.stats.speed / 10;
    const weight = 0.8 + f.stats.power / 20;
    return [
      f.id,
      {
        id: f.id,
        codename: f.codename,
        archetype: asArchetype(f.archetype),
        weight,
        jumpForce: 1.6 + speed * 0.8,
        baseSpeed: 0.8 + speed * 0.9,
        friction: 0.85,
        gravityScale: 0.9 + (10 - f.stats.speed) / 25,
        baseDamage: 4 + f.stats.power * 0.45,
        comboWindowMs: 650 + f.stats.tech * 45,
        ultimateChargePerHit: 8 + f.stats.tech * 0.6,
      },
    ];
  }),
);
