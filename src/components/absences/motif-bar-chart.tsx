"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, Tooltip, LabelList } from "recharts";
import { ABSENCE_MOTIFS } from "@/lib/enums";

const COLOR: Record<string, string> = {
  PERSONAL: "#2563eb",
  STATUTORY: "#16a34a",
  TRAINING: "#ca8a04",
  MEDICAL: "#dc2626",
  FORCE_MAJEURE: "#d97706",
};
const SHORT: Record<string, string> = {
  PERSONAL: "Aff. perso.",
  STATUTORY: "Congé régl.",
  TRAINING: "Formation",
  MEDICAL: "Médical",
  FORCE_MAJEURE: "Force maj.",
};

/** Diagramme des jours d'absence cumulés par motif, pour un agent. */
export function MotifBarChart({ byMotif }: { byMotif: Record<string, number> }) {
  const data = ABSENCE_MOTIFS.map((m) => ({
    key: m.value,
    label: SHORT[m.value] ?? m.label,
    days: byMotif[m.value] ?? 0,
    color: COLOR[m.value] ?? "#94a3b8",
  }));

  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 28, bottom: 4, left: 4 }}>
          <XAxis type="number" allowDecimals={false} hide />
          <YAxis type="category" dataKey="label" width={86} tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
          <Tooltip cursor={{ fill: "#f8fafc" }} contentStyle={{ borderRadius: 14, border: "1px solid #F1F5F9", fontSize: 13 }} />
          <Bar dataKey="days" name="Jours" radius={[0, 6, 6, 0]} barSize={16}>
            {data.map((d) => <Cell key={d.key} fill={d.color} />)}
            <LabelList dataKey="days" position="right" fontSize={11} fill="#94a3b8" formatter={(v: number) => (v > 0 ? `${v} j` : "")} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
