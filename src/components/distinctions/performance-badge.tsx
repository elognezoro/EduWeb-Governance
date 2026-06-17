import { cn } from "@/lib/utils";

/**
 * Distinction de belle performance : l'emblème FG (bouclier + couronne + document
 * certifié) entouré de l'organigramme des agents — symbole de la reconnaissance
 * des agents performants. Recomposé en SVG (net à toute taille) autour de
 * l'emblème /distinctions/shield.png.
 */
export function PerformanceBadge({ className, title = "Distinction — belle performance" }: { className?: string; title?: string }) {
  const dark = "#2f3a45";
  // Trois agents par côté, reliés à un tronc qui rejoint l'emblème central.
  const personY = [46, 110, 174];

  const Person = ({ x, y }: { x: number; y: number }) => (
    <g>
      <circle cx={x} cy={y} r={17} fill={dark} />
      <circle cx={x} cy={y - 4} r={5} fill="#fff" />
      <path d={`M ${x - 8} ${y + 8} a 8 8 0 0 1 16 0 Z`} fill="#fff" />
    </g>
  );

  return (
    <svg
      viewBox="0 0 360 220"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>

      {/* Connecteurs (organigramme) */}
      <g stroke={dark} strokeWidth={5} strokeLinecap="round" fill="none">
        {/* Gauche */}
        {personY.map((y) => <line key={`l${y}`} x1={47} y1={y} x2={64} y2={y} />)}
        <line x1={64} y1={personY[0]} x2={64} y2={personY[2]} />
        <line x1={64} y1={110} x2={116} y2={110} />
        {/* Droite */}
        {personY.map((y) => <line key={`r${y}`} x1={313} y1={y} x2={296} y2={y} />)}
        <line x1={296} y1={personY[0]} x2={296} y2={personY[2]} />
        <line x1={296} y1={110} x2={244} y2={110} />
      </g>
      {/* Nœuds */}
      <g fill={dark}>
        <circle cx={64} cy={110} r={6} />
        <circle cx={296} cy={110} r={6} />
      </g>

      {/* Agents */}
      {personY.map((y) => <Person key={`pl${y}`} x={30} y={y} />)}
      {personY.map((y) => <Person key={`pr${y}`} x={330} y={y} />)}

      {/* Emblème central FG (bouclier + couronne + document certifié) */}
      <image href="/distinctions/shield.png" x="112" y="26" width="136" height="168" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
}
