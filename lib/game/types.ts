export type Vec2 = { x: number; y: number };

export type RuntimeArchetype = 'Rushdown' | 'Zoner' | 'Grappler' | 'Trickster' | 'Bruiser';

export type FighterRuntimeDef = {
  id: string;
  codename: string;
  archetype: RuntimeArchetype;
  weight: number;
  jumpForce: number;
  baseSpeed: number;
  friction: number;
  gravityScale: number;
  baseDamage: number;
  comboWindowMs: number;
  ultimateChargePerHit: number;
};

export type FighterRuntimeState = {
  playerId: string;
  fighterId: string;
  team: 1 | 2;
  position: Vec2;
  velocity: Vec2;
  facing: 1 | -1;
  percent: number;
  stocks: number;
  grounded: boolean;
  stunMs: number;
  invulnMs: number;
  ultimateMeter: number;
  lastHitAtMs: number | null;
  comboCount: number;
  comboDamage: number;
  shield: number;
  alive: boolean;
};

export type StageHazard = {
  id: string;
  name: string;
  intervalMs: number;
  radius: number;
  center: Vec2;
  knockback: number;
  damage: number;
  nextTriggerAtMs: number;
};

export type StageRuntime = {
  id: string;
  blastZone: { left: number; right: number; top: number; bottom: number };
  floorY: number;
  hazards: StageHazard[];
};

export type MatchPhase = 'lobby' | 'countdown' | 'live' | 'sudden-death' | 'finished';

export type InputFrame = {
  playerId: string;
  moveX: -1 | 0 | 1;
  jump: boolean;
  dodge: boolean;
  light: boolean;
  heavy: boolean;
  special: boolean;
  ultimate: boolean;
};

export type CombatEventType =
  | 'hit'
  | 'ko'
  | 'hazard-hit'
  | 'ultimate-fired'
  | 'assist-called'
  | 'phase-changed'
  | 'combo-extended';

export type CombatEvent = {
  atMs: number;
  type: CombatEventType;
  actorId?: string;
  targetId?: string;
  value?: number;
  note?: string;
};

export type MatchRuntimeState = {
  id: string;
  phase: MatchPhase;
  nowMs: number;
  endsAtMs: number;
  countdownEndsAtMs: number;
  fighters: FighterRuntimeState[];
  stage: StageRuntime;
  events: CombatEvent[];
  seed: number;
};

export type StepRequest = {
  dtMs: number;
  inputs: InputFrame[];
};
