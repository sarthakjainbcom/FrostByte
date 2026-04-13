export function TimelineRoadmap({ items }: { items: { season: string; status: string; items: string[] }[] }) {
  return <ol className="space-y-4">{items.map((item) => <li key={item.season} className="rounded border border-white/10 p-4"><p className="text-cyan">{item.status}</p><h3 className="font-bold">{item.season}</h3><ul className="list-disc pl-5">{item.items.map((i) => <li key={i}>{i}</li>)}</ul></li>)}</ol>;
}
