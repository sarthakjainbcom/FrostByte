export function ModeCard({ mode }: { mode: { name: string; players: string; duration: string; skill: string; chaos: string } }) {
  return <article className="rounded border border-white/10 p-4"><h3 className="font-bold">{mode.name}</h3><p className="text-sm">Players: {mode.players}</p><p className="text-sm">Avg: {mode.duration}</p><p className="text-sm">Skill: {mode.skill} · Chaos: {mode.chaos}</p></article>;
}
