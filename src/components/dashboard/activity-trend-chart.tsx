"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export interface TrendPoint {
  month: string;
  saisies: number;
  validees: number;
}

export function ActivityTrendChart({ data }: { data: TrendPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
        <defs>
          {/* Saisies en bleu, Validées en vert */}
          <linearGradient id="gSaisies" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gValidees" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0F766E" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip
          contentStyle={{
            borderRadius: 16,
            border: "1px solid #F1F5F9",
            boxShadow: "0 12px 32px -12px rgba(15,23,42,0.18)",
            fontSize: 13,
          }}
        />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
        <Area type="monotone" dataKey="saisies" name="Saisies" stroke="#1D4ED8" strokeWidth={2.5} fill="url(#gSaisies)" />
        <Area type="monotone" dataKey="validees" name="Validées" stroke="#0F766E" strokeWidth={2.5} fill="url(#gValidees)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
