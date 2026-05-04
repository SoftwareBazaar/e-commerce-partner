import logo from "@/assets/logo.png";
import { BRAND } from "@/data/site";

export const Brand = ({ size = 36, showText = true }: { size?: number; showText?: boolean }) => (
  <div className="flex items-center gap-2.5">
    <img
      src={logo}
      alt={`${BRAND.full} logo`}
      width={size}
      height={size}
      className="object-contain drop-shadow-[0_0_12px_hsl(var(--primary)/0.4)]"
      style={{ width: size, height: size }}
    />
    {showText && (
      <span className="font-display text-lg font-bold tracking-tight leading-none">
        {BRAND.name}
        <span className="text-primary">Algo</span>
      </span>
    )}
  </div>
);
