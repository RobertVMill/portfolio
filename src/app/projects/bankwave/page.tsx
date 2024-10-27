'use client';

import React, { useState } from 'react';
import { Brain, TrendingUp, Cpu, LucideIcon } from 'lucide-react';

type MetricType = 'innovations' | 'implementations' | 'investments';

interface ChartData {
  name: string;
  innovations: number;
  implementations: number;
  investments: number;
}

interface TooltipProps {
  active: boolean;
  x: number;
  y: number;
  value: number;
  label: string;
  metric: MetricType;
}

const ChartTooltip = ({ active, x, y, value, label, metric }: TooltipProps) => {
  if (!active) return null;

  return (
    <g transform={`translate(${x - 50}, ${y - 40})`}>
      <rect
        x="0"
        y="0"
        width="100"
        height="35"
        rx="4"
        fill="#1f2937"
        stroke="#374151"
      />
      <text x="50" y="15" textAnchor="middle" fill="#9ca3af" fontSize="12">
        {label}
      </text>
      <text x="50" y="30" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
        {metric === 'investments' ? `$${value}M` : value}
      </text>
    </g>
  );
};

const CustomChart = ({ 
  data, 
  metric, 
  color 
}: { 
  data: ChartData[];
  metric: MetricType;
  color: string;
}) => {
  const [activePoint, setActivePoint] = useState<{
    active: boolean;
    x: number;
    y: number;
    value: number;
    label: string;
  } | null>(null);

  const maxValue = Math.max(...data.map(item => item[metric]));
  const width = 800;
  const height = 400;
  const padding = 40;
  const chartWidth = width - (2 * padding);
  const chartHeight = height - (2 * padding);

  const points = data.map((item, index) => ({
    x: padding + (index * (chartWidth / (data.length - 1))),
    y: height - padding - ((item[metric] / maxValue) * chartHeight),
    value: item[metric],
    label: item.name
  }));

  const pathD = points.reduce((path, point, i) => {
    return path + (i === 0 ? `M ${point.x},${point.y}` : ` L ${point.x},${point.y}`);
  }, '');

  const areaPath = `${pathD} L ${points[points.length - 1].x},${height - padding} L ${padding},${height - padding} Z`;

  return (
    <svg 
      viewBox={`0 0 ${width} ${height}`} 
      className="w-full h-full"
      onMouseLeave={() => setActivePoint(null)}
    >
      <defs>
        <linearGradient id={`gradient-${metric}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[...Array(5)].map((_, i) => {
        const y = padding + (i * (chartHeight / 4));
        const value = Math.round(maxValue - ((i * maxValue) / 4));
        return (
          <g key={i}>
            <line
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="#334155"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
            <text
              x={padding - 10}
              y={y}
              textAnchor="end"
              alignmentBaseline="middle"
              fill="#94a3b8"
              fontSize="12"
            >
              {metric === 'investments' ? `$${value}M` : value}
            </text>
          </g>
        );
      })}

      {/* X axis labels */}
      {data.map((item, i) => (
        <text
          key={i}
          x={padding + (i * (chartWidth / (data.length - 1)))}
          y={height - padding + 20}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="12"
        >
          {item.name}
        </text>
      ))}

      {/* Area fill */}
      <path
        d={areaPath}
        fill={`url(#gradient-${metric})`}
      />

      {/* Line */}
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2"
      />

      {/* Interactive data points */}
      {points.map((point, i) => (
        <g key={i}>
          {/* Larger invisible circle for better hover area */}
          <circle
            cx={point.x}
            cy={point.y}
            r="12"
            fill="transparent"
            onMouseEnter={() => setActivePoint({
              active: true,
              x: point.x,
              y: point.y,
              value: point.value,
              label: point.label
            })}
            style={{ cursor: 'pointer' }}
          />
          {/* Visible point */}
          <circle
            cx={point.x}
            cy={point.y}
            r="4"
            fill={color}
          />
        </g>
      ))}

      {/* Tooltip */}
      {activePoint && (
        <ChartTooltip
          active={activePoint.active}
          x={activePoint.x}
          y={activePoint.y}
          value={activePoint.value}
          label={activePoint.label}
          metric={metric}
        />
      )}
    </svg>
  );
};

// Monthly data stays the same
const monthlyData: ChartData[] = [
  { 
    name: "Jan", 
    innovations: 24,
    implementations: 18,
    investments: 180
  },
  { 
    name: "Feb", 
    innovations: 30,
    implementations: 24,
    investments: 240
  },
  { 
    name: "Mar", 
    innovations: 28,
    implementations: 22,
    investments: 220
  },
  { 
    name: "Apr", 
    innovations: 50,
    implementations: 28,
    investments: 280
  },
  { 
    name: "May", 
    innovations: 42,
    implementations: 32,
    investments: 320
  },
  { 
    name: "Jun", 
    innovations: 60,
    implementations: 38,
    investments: 380
  },
];

interface MetricConfig {
  color: string;
  icon: LucideIcon;
  label: string;
  prefix?: string;
}

export default function BankWaveDashboard() {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("implementations");

  const metrics: Record<MetricType, MetricConfig> = {
    innovations: { 
      color: "#10b981", 
      icon: Brain,
      label: "New AI Technologies"
    },
    implementations: { 
      color: "#6366f1", 
      icon: Cpu,
      label: "Active Deployments"
    },
    investments: { 
      color: "#ef4444", 
      icon: TrendingUp,
      label: "AI Investments",
      prefix: "$"
    }
  };

  const calculateMetricValue = (metric: MetricType) => {
    const total = monthlyData.reduce((acc, month) => acc + month[metric], 0);
    if (metric === "investments") {
      return `$${total}M`;
    }
    return total.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 pt-24">
        <h1 className="text-3xl font-bold text-white mb-8">AI Banking Innovations</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {(Object.entries(metrics) as [MetricType, MetricConfig][]).map(([metric, { color, icon: Icon, label }]) => (
            <div
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              className={`p-6 rounded-xl border cursor-pointer transition-all ${
                selectedMetric === metric
                  ? "bg-white/10 border-blue-500"
                  : "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">{label}</p>
                  <p className="text-2xl font-bold text-white mt-2">
                    {calculateMetricValue(metric)}
                  </p>
                </div>
                <Icon className="h-8 w-8" style={{ color }} />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6 capitalize">
            {metrics[selectedMetric].label} Growth
          </h2>
          <div className="h-[400px] w-full">
            <CustomChart 
              data={monthlyData} 
              metric={selectedMetric} 
              color={metrics[selectedMetric].color} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}