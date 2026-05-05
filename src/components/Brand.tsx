import logo from "@/assets/logo.png";
import { BRAND } from "@/data/site";

export const Brand = ({ size = 48, showText = true }: { size?: number; showText?: boolean }) => (
  <div className="flex items-center gap-3">
    <img
      src={logo}
      alt={`${BRAND.full} logo`}
      width={size}
      height={size}
      className="object-contain drop-shadow-[0_0_14px_hsl(var(--primary)/0.45)]"
      style={{ width: size, height: size }}
    />
    {showText && (
      <span className="font-display font-bold tracking-tight leading-tight flex flex-col">
        <span className="text-base sm:text-lg">
          Neuro<span className="text-primary">Algo</span>
        </span>
        <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground -mt-0.5">
          {BRAND.suffix}
        </span>
      </span>
    )}
  </div>
);
