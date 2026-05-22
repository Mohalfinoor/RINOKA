import { SVGProps } from "react";

/**
 * RinokaLogoIcon
 * A mathematically precise, high-fidelity SVG icon of the Rinoka classic monogram.
 * Inspired by the uploaded brand image featuring Japanese wooden structure harmony
 * and French classical elegance.
 */
export function RinokaLogoIcon({ className = "w-10 h-10", ...props }: { className?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Top Petal / Elegant Leaf */}
      <path
        d="M50 12 C44 21 44 33 50 39 C56 33 56 21 50 12 Z"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Small horizontal ribbon / bow loop under the petal */}
      <path
        d="M50 39 C42 36 42 42 50 42 C58 42 58 36 50 39 Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left elegant scroll curve */}
      <path
        d="M50 42 C44 50 35 63 22 63 C11 63 8 50 18 42 C27 35 37 42 36 50 C35 55 30 58 26 55 C24 53 24 49 27 48"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right elegant scroll curve (perfect mirrored symmetry) */}
      <path
        d="M50 42 C56 50 65 63 78 63 C89 63 92 50 82 42 C73 35 63 42 64 50 C65 55 70 58 74 55 C76 53 76 49 73 48"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * RinokaLogoBrand
 * Renders the complete, gorgeous branding card with deep teal background
 * and cream/gold monogram with spaced-out serif text, matching the user photo.
 */
export function RinokaLogoBrand({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-editorial-accent border border-editorial-border p-8 text-center flex flex-col items-center justify-center space-y-4 shadow-xl ${className}`}>
      <RinokaLogoIcon className="w-20 h-16 text-editorial-gold" />
      <div className="space-y-1">
        <h3 className="font-serif font-medium text-2xl tracking-[0.25em] text-[#FAFAF5] leading-tight select-none">
          RINOKA
        </h3>
        <span className="text-[8px] uppercase tracking-[0.3em] text-[#D5B277] font-semibold block">
          SUMMARECON & SUMITOMO FORESTRY
        </span>
      </div>
    </div>
  );
}
