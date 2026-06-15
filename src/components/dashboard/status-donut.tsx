"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

export interface DonutSlice {
  name: string;
  value: number;
  color: string;
}

export function StatusDonut({ data }: { data: DonutSlice[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="flex items-center gap-6">
      <div className="relative h-44 w-44 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={56}
              outerRadius={80}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 14,
                border: "1px solid #F1F5F9",
                fontSize: 13,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold text-institutional-900">{total}</span>
          <span className="text-xs font-medium text-slate-400">total</span>
        </div>
      </div>
      <ul className="flex-1 space-y-2.5">
        {data.map((d) => (
          <li key={d.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-600">
              <span className="size-2.5 rounded-full" style={{ background: d.color }} />
              {d.name}
            </span>
            <span className="font-bold text-institutional-900">{d.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
