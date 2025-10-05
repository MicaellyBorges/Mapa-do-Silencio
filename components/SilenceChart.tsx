
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { SILENCE_LEVELS } from '../constants';

interface SilenceChartProps {
  data: number[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const score = payload[0].value;
    const roundedScore = Math.round(score);
    const silenceInfo = SILENCE_LEVELS[roundedScore as keyof typeof SILENCE_LEVELS];
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-bold text-gray-800">{`Horário: ${label}:00`}</p>
        <p className="text-sm text-gray-600">
          Nível de Silêncio: <span className={`font-semibold ${silenceInfo.color}`}>{score.toFixed(1)} ({silenceInfo.label})</span>
        </p>
      </div>
    );
  }
  return null;
};


export const SilenceChart: React.FC<SilenceChartProps> = ({ data }) => {
  const chartData = data.map((value, index) => ({
    hour: `${String(index).padStart(2, '0')}`,
    value,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
        <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUv)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
};
