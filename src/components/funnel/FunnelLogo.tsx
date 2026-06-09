export function FunnelLogo({ belowBanner = false }: { belowBanner?: boolean }) {
  return (
    <div className={`absolute left-0 right-0 flex justify-center pointer-events-none ${belowBanner ? "top-[48px]" : "top-5"}`}>
      <img src="/logo.svg" alt="Kasoria" className="h-7 w-auto pointer-events-auto" />
    </div>
  );
}
