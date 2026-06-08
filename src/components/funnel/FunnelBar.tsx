interface FunnelBarProps {
  done: number;
  total: number;
}

export function FunnelBar({ done, total }: FunnelBarProps) {
  const pct = total > 0 ? (done / total) * 100 : 0;

  return (
    <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/[0.07]">
      <div
        className="h-full bg-[#f0efe9] transition-[width] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
