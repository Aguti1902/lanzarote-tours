import Image from "next/image";

type Props = {
  variant: "onDark" | "onLight";
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function BrandLogo({
  variant,
  className = "",
  priority,
  sizes = "240px",
}: Props) {
  const src =
    variant === "onDark"
      ? "/images/brand/logo-white.png"
      : "/images/brand/logo-green.png";

  return (
    <span className={`relative block ${className}`}>
      <Image
        src={src}
        alt="Lanzarote Tours"
        fill
        priority={priority}
        className="object-contain object-left"
        sizes={sizes}
      />
    </span>
  );
}
