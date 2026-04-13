export type Fighter = {
  id: string;
  codename: string;
  archetype: string;
  difficulty: number;
  crew: string;
  role: string;
  blurb: string;
  signatureMove: string;
  ultimateMove: string;
  mobility: string;
  range: string;
  stats: Record<'speed' | 'power' | 'range' | 'control' | 'tech', number>;
  strengths: string[];
  weaknesses: string[];
  comboTips: string[];
};

export type Stage = {
  id: string;
  name: string;
  hazardIntensity: number;
  theme: string;
  hazards: string[];
  legalModes: string[];
  dayNight: string[];
};
