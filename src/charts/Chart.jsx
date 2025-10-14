import React, { useMemo, useRef, useState } from 'react';
import './charts.scss';

// Lightweight SVG chart renderer compatible with Fusion-like dataSource
// Supported types: bar2d, doughnut2d, pie, scrollstackedcolumn2d, msline, area2d, heatmap, pareto2d, radar, bubble

const VIEWBOX_WIDTH = 800;
const VIEWBOX_HEIGHT = 420;
const PASTEL_COLORS = [
  '#a5b4fc', // indigo-300
  '#93c5fd', // blue-300
  '#86efac', // green-300
  '#f9a8d4', // pink-300
  '#fcd34d', // amber-300
  '#c4b5fd', // violet-300
  '#fca5a5', // red-300
  '#67e8f9', // cyan-300
];
// High-contrast, differentiable palette for radar
const RADAR_COLORS = [
  '#2563eb', // blue-600
  '#f59e0b', // amber-500
  '#10b981', // emerald-500
  '#8b5cf6', // violet-600
  '#ef4444', // red-500
  '#06b6d4', // cyan-500
  '#ec4899', // pink-500
];
// High-contrast palette for line charts
const LINE_COLORS = [
  '#2563eb', // blue-600
  '#f59e0b', // amber-500
  '#10b981', // emerald-500
  '#8b5cf6', // violet-600
  '#ef4444', // red-500
  '#14b8a6', // teal-500
  '#eab308', // yellow-500
];
// Prefer warmer palette for doughnut, avoiding the default blue
const DOUGHNUT_COLORS = [
  '#f9a8d4', // pink-300
  '#fca5a5', // red-300
  '#fcd34d', // amber-300
  '#86efac', // green-300
  '#a5b4fc', // indigo-300
  '#c4b5fd', // violet-300
  '#67e8f9', // cyan-300
];
const DIM_OPACITY = 0.35;
const GRAY_COLOR = '#cbd5e1';

function createLinearScale(domainMin, domainMax, rangeMin, rangeMax) {
  const d = domainMax - domainMin || 1;
  const r = rangeMax - rangeMin;
  return (value) => rangeMin + ((Number(value) - domainMin) / d) * r;
}

function toNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function formatShort(n) {
  const v = Math.abs(n);
  if (v >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (v >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return String(n);
}

function normalizeColor(input, fallback) {
  if (typeof input !== 'string' || input.length === 0) return fallback;
  const c = input.trim();
  if (c.startsWith('#')) return c;
  const hexMatch = /^[0-9a-fA-F]{6}$/.test(c) || /^[0-9a-fA-F]{3}$/.test(c);
  if (hexMatch) return `#${c}`;
  return c || fallback;
}

function parseHexToRgb(hex) {
  if (!hex || typeof hex !== 'string') return null;
  let h = hex.trim();
  if (h.startsWith('#')) h = h.slice(1);
  if (h.length === 3) h = h.split('').map((ch) => ch + ch).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return { r, g, b };
}

function resolveDisplayColor(rawColor, fallbackColor) {
  const rgb = parseHexToRgb(rawColor);
  if (!rgb) return rawColor || fallbackColor;
  // relative luminance and colorfulness
  const max = Math.max(rgb.r, rgb.g, rgb.b);
  const min = Math.min(rgb.r, rgb.g, rgb.b);
  const chroma = max - min; // 0..255
  const luminance = (0.2126 * (rgb.r / 255)) + (0.7152 * (rgb.g / 255)) + (0.0722 * (rgb.b / 255));
  // Slightly stricter filters to avoid very dark or neutral gray colors
  const isTooDark = luminance < 0.5; // darker than mid-grey
  const isGrayish = chroma < 48; // low saturation -> grayish
  if (isTooDark || isGrayish) return fallbackColor;
  return rawColor;
}

function getMaxFromSeries(series) {
  let maxValue = 0;
  series.forEach((s) => {
    (s?.data || []).forEach((p) => {
      maxValue = Math.max(maxValue, toNumber(p?.value));
    });
  });
  return maxValue;
}

function BarChart({ data = [], colors = PASTEL_COLORS, margin = { top: 24, right: 16, bottom: 48, left: 48 }, onDataClick, onHover, hoverKey, hiddenIndexes = new Set(), dimIndexes = new Set() }) {
  const innerWidth = VIEWBOX_WIDTH - margin.left - margin.right;
  const innerHeight = VIEWBOX_HEIGHT - margin.top - margin.bottom;
  const values = data.map((d) => toNumber(d.value));
  const maxValue = Math.max(1, ...values);
  const yScale = createLinearScale(0, maxValue, innerHeight, 0);
  const step = innerWidth / Math.max(1, data.length);
  const barWidth = step * 0.6;

  return (
    <g transform={`translate(${margin.left},${margin.top})`}>
      {/* axes */}
      <line x1={0} y1={innerHeight} x2={innerWidth} y2={innerHeight} stroke="#CBD5E1" />
      <line x1={0} y1={0} x2={0} y2={innerHeight} stroke="#CBD5E1" />
      {/* y ticks */}
      {(() => {
        const steps = 5;
        return Array.from({ length: steps + 1 }).map((_, i) => {
          const t = i / steps;
          const val = t * maxValue;
          const y = yScale(val);
          return (
            <g key={`by-${i}`}>
              <line x1={0} y1={y} x2={4} y2={y} stroke="#CBD5E1" />
              <line x1={0} y1={y} x2={innerWidth} y2={y} stroke="#e5e7eb" opacity={0.35} />
              <text x={-6} y={y + 3} textAnchor="end" fontSize="10" fill="#64748B">{formatShort(Math.round(val))}</text>
            </g>
          );
        });
      })()}
      {data.map((d, i) => {
        const isDimByLegend = hiddenIndexes.has(i) || dimIndexes.has(i);
        const barHeight = innerHeight - yScale(d.value);
        const x = i * step + (step - barWidth) / 2;
        const y = innerHeight - barHeight;
        const baseColor = resolveDisplayColor(
          normalizeColor(d.color, colors[i % colors.length] || '#93c5fd'),
          colors[i % colors.length] || '#93c5fd'
        );
        const fill = isDimByLegend ? GRAY_COLOR : baseColor;
        const key = `bar-${i}`;
        const hoverDim = hoverKey && hoverKey !== key ? 0.45 : 1;
        const dim = isDimByLegend ? DIM_OPACITY : hoverDim;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx={4}
              fill={fill}
              opacity={dim}
              style={{ cursor: onDataClick ? 'pointer' : 'default' }}
              onClick={() => onDataClick?.({ data: { categoryLabel: d.label, value: d.value, color: fill } })}
              onMouseEnter={(e) => onHover?.(e, { key, label: d.label, value: d.value, color: fill })}
              onMouseMove={(e) => onHover?.(e, { key, label: d.label, value: d.value, color: fill })}
            />
            <text x={x + barWidth / 2} y={innerHeight + 16} textAnchor="middle" fontSize="12" fill="#475569">{d.label}</text>
          </g>
        );
      })}
    </g>
  );
}

function arcTo(r, large, sweep, x, y) {
  return `A ${r} ${r} 0 ${large} ${sweep} ${x} ${y}`;
}

function PieChart({ data = [], innerRadius = 0, colors = DOUGHNUT_COLORS, onDataClick, onHover, hoverKey, hiddenSlices = new Set(), dimSlices = new Set() }) {
  const cx = VIEWBOX_WIDTH / 2;
  const cy = VIEWBOX_HEIGHT / 2;
  const radius = Math.min(VIEWBOX_WIDTH, VIEWBOX_HEIGHT) / 2 - 12;
  const total = data.reduce((acc, d) => acc + toNumber(d.value), 0) || 1;
  let angle = -Math.PI / 2;

  return (
    <g>
      {data.map((d, i) => {
        const isDimByLegend = hiddenSlices.has(i) || dimSlices.has(i);
        const value = toNumber(d.value);
        const delta = (value / total) * Math.PI * 2;
        const startAngle = angle;
        const endAngle = angle + delta;
        angle = endAngle;
        const large = endAngle - startAngle > Math.PI ? 1 : 0;
        const baseColor = resolveDisplayColor(
          normalizeColor(d.color, colors[i % colors.length] || '#93c5fd'),
          colors[i % colors.length] || '#93c5fd'
        );
        const color = isDimByLegend ? GRAY_COLOR : baseColor;
        const x1 = cx + radius * Math.cos(startAngle);
        const y1 = cy + radius * Math.sin(startAngle);
        const x2 = cx + radius * Math.cos(endAngle);
        const y2 = cy + radius * Math.sin(endAngle);
        const r0 = innerRadius > 0 ? Math.max(0, radius - innerRadius) : 0;
        const xi2 = cx + r0 * Math.cos(endAngle);
        const yi2 = cy + r0 * Math.sin(endAngle);
        const xi1 = cx + r0 * Math.cos(startAngle);
        const yi1 = cy + r0 * Math.sin(startAngle);
        const key = `slice-${i}`;
        const hoverDim = hoverKey && hoverKey !== key ? 0.5 : 1;
        const dim = isDimByLegend ? DIM_OPACITY : hoverDim;
        let dPath;
        if (innerRadius > 0) {
          // Donut: outer arc (sweep 1), line to inner end, inner arc back (sweep 0), close
          dPath = `M ${x1} ${y1} ${arcTo(radius, large, 1, x2, y2)} L ${xi2} ${yi2} ${arcTo(r0, large, 0, xi1, yi1)} Z`;
        } else {
          // Pie: outer arc then line to center
          dPath = `M ${x1} ${y1} ${arcTo(radius, large, 1, x2, y2)} L ${cx} ${cy} Z`;
        }
        return <path key={i} d={dPath} fill={color} stroke="#fff" strokeWidth="1" opacity={dim} style={{ cursor: onDataClick ? 'pointer' : 'default' }} onClick={() => onDataClick?.({ data: { categoryLabel: d.label, value: d.value, color } })} onMouseEnter={(e) => onHover?.(e, { key, label: d.label, value: d.value, color })} onMouseMove={(e) => onHover?.(e, { key, label: d.label, value: d.value, color })} />;
      })}
    </g>
  );
}

function StackedColumnChart({ categories = [], series = [], margin = { top: 48, right: 16, bottom: 56, left: 48 }, onLegendClick, hiddenSeries = new Set(), onDataClick, onHover, hoverKey }) {
  const innerWidth = VIEWBOX_WIDTH - margin.left - margin.right;
  const innerHeight = VIEWBOX_HEIGHT - margin.top - margin.bottom;
  const numGroups = Math.max(1, categories.length);
  const step = innerWidth / numGroups;
  const barWidth = step * 0.6;
  // Always compute scale from full data so dimming a legend doesn't change bar heights
  const sums = categories.map((_, i) => series.reduce((a, s) => a + toNumber(s?.data?.[i]?.value), 0));
  const maxValue = Math.max(1, ...sums);
  const yScale = createLinearScale(0, maxValue, innerHeight, 0);

  return (
    <g transform={`translate(${margin.left},${margin.top})`}>
      {/* (moved to absolute legend div for better layout) */}
      <line x1={0} y1={innerHeight} x2={innerWidth} y2={innerHeight} stroke="#CBD5E1" />
      <line x1={0} y1={0} x2={0} y2={innerHeight} stroke="#CBD5E1" />
      {/* y ticks */}
      {(() => {
        const steps = 5;
        return Array.from({ length: steps + 1 }).map((_, i) => {
          const t = i / steps;
          const val = t * maxValue;
          const y = yScale(val);
          return (
            <g key={`sy-${i}`}>
              <line x1={0} y1={y} x2={4} y2={y} stroke="#CBD5E1" />
              <line x1={0} y1={y} x2={innerWidth} y2={y} stroke="#e5e7eb" opacity={0.35} />
              <text x={-6} y={y + 3} textAnchor="end" fontSize="10" fill="#64748B">{formatShort(Math.round(val))}</text>
            </g>
          );
        });
      })()}
      {categories.map((cat, i) => {
        const x = i * step + (step - barWidth) / 2;
        let yCursor = innerHeight;
        return (
          <g key={i}>
            {series.map((s, j) => {
              const isDimByLegend = hiddenSeries.has(j);
              const value = toNumber(s?.data?.[i]?.value);
              const yTop = yScale(value);
              const h = innerHeight - yTop;
              yCursor -= h;
              const baseColor = resolveDisplayColor(
                normalizeColor(s.color, PASTEL_COLORS[j % PASTEL_COLORS.length]),
                PASTEL_COLORS[j % PASTEL_COLORS.length]
              );
              const color = isDimByLegend ? GRAY_COLOR : baseColor;
              const key = `stack-${i}-${j}`;
              const hoverDim = hoverKey && hoverKey !== key ? 0.5 : 1;
              const dim = isDimByLegend ? DIM_OPACITY : hoverDim;
              return <rect key={j} x={x} y={yCursor} width={barWidth} height={h} fill={color} rx={3} opacity={dim} style={{ cursor: onDataClick ? 'pointer' : 'default' }} onClick={() => onDataClick?.({ data: { categoryLabel: cat?.label, value, color, seriesName: s.seriesname } })} onMouseEnter={(e) => onHover?.(e, { key, label: cat?.label, value })} onMouseMove={(e) => onHover?.(e, { key, label: cat?.label, value })} />;
            })}
            <text x={x + barWidth / 2} y={innerHeight + 16} textAnchor="middle" fontSize="12" fill="#475569">{cat?.label || ''}</text>
          </g>
        );
      })}
    </g>
  );
}

function LineChart({ categories = [], series = [], area = false, margin = { top: 24, right: 16, bottom: 56, left: 48 }, hiddenSeries = new Set(), dimArea = false }) {
  const innerWidth = VIEWBOX_WIDTH - margin.left - margin.right;
  const innerHeight = VIEWBOX_HEIGHT - margin.top - margin.bottom;
  const maxValue = Math.max(1, getMaxFromSeries(series));
  const yScale = createLinearScale(0, maxValue, innerHeight, 0);
  const step = innerWidth / Math.max(1, Math.max(categories.length - 1, 1));

  function buildPath(values) {
    return values
      .map((v, i) => {
        const x = i * step;
        const y = yScale(toNumber(v?.value));
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  }

  return (
    <g transform={`translate(${margin.left},${margin.top})`}>
      <line x1={0} y1={innerHeight} x2={innerWidth} y2={innerHeight} stroke="#CBD5E1" />
      <line x1={0} y1={0} x2={0} y2={innerHeight} stroke="#CBD5E1" />
      {/* y ticks left */}
      {(() => {
        const steps = 5;
        return Array.from({ length: steps + 1 }).map((_, i) => {
          const t = i / steps;
          const val = t * maxValue;
          const y = yScale(val);
          return (
            <g key={`py-${i}`}>
              <line x1={0} y1={y} x2={4} y2={y} stroke="#CBD5E1" />
              <line x1={0} y1={y} x2={innerWidth} y2={y} stroke="#e5e7eb" opacity={0.35} />
              <text x={-6} y={y + 3} textAnchor="end" fontSize="10" fill="#64748B">{formatShort(Math.round(val))}</text>
            </g>
          );
        });
      })()}
      {/* y ticks */}
      {(() => {
        const steps = 5;
        const m = Math.max(1, getMaxFromSeries(series));
        return Array.from({ length: steps + 1 }).map((_, i) => {
          const t = i / steps;
          const val = t * m;
          const y = yScale(val);
          return (
            <g key={`ly-${i}`}>
              <line x1={0} y1={y} x2={4} y2={y} stroke="#CBD5E1" />
              <line x1={0} y1={y} x2={innerWidth} y2={y} stroke="#e5e7eb" opacity={0.35} />
              <text x={-6} y={y + 3} textAnchor="end" fontSize="10" fill="#64748B">{formatShort(Math.round(val))}</text>
            </g>
          );
        });
      })()}
      {series.map((s, i) => {
        const isDimByLegend = hiddenSeries.has(i) || (area && dimArea);
        const baseColor = s.color || LINE_COLORS[i % LINE_COLORS.length];
        const color = isDimByLegend ? GRAY_COLOR : baseColor;
        const pts = s?.data || [];
        const d = buildPath(pts);
        const areaPath = area
          ? `${d} L ${step * Math.max(0, (s?.data?.length || 1) - 1)} ${innerHeight} L 0 ${innerHeight} Z`
          : null;
        return (
          <g key={i}>
            {area && <path d={areaPath} fill={color} opacity={isDimByLegend ? DIM_OPACITY : 0.15} />}
            <path d={d} fill="none" stroke={color} strokeWidth={2} opacity={isDimByLegend ? DIM_OPACITY : 1} />
            {pts.map((v, pi) => {
              const x = pi * step;
              const y = yScale(toNumber(v?.value));
              return <circle key={pi} cx={x} cy={y} r={3} fill={color} opacity={isDimByLegend ? DIM_OPACITY : 1} />;
            })}
          </g>
        );
      })}
      {categories.map((c, i) => (
        <text key={i} x={i * step} y={innerHeight + 16} textAnchor="middle" fontSize="12" fill="#475569">{c?.label || ''}</text>
      ))}
    </g>
  );
}

function Heatmap({ rows = [], columns = [], values = [], colorrange = null, margin = { top: 24, right: 16, bottom: 48, left: 56 }, onDataClick, onHover, hoverKey }) {
  const innerWidth = VIEWBOX_WIDTH - margin.left - margin.right;
  const innerHeight = VIEWBOX_HEIGHT - margin.top - margin.bottom;
  const cellWidth = innerWidth / Math.max(1, columns.length);
  const cellHeight = innerHeight / Math.max(1, rows.length);
  const nums = values.map((v) => toNumber(v.value));
  const minV = Math.min(...nums, 0);
  const maxV = Math.max(...nums, 1);

  function hexToRgb(hex) {
    const n = hex?.replace('#','');
    if (!n || (n.length !== 6 && n.length !== 3)) return { r: 0, g: 0, b: 0 };
    const full = n.length === 3 ? n.split('').map((c) => c + c).join('') : n;
    const r = parseInt(full.slice(0,2), 16);
    const g = parseInt(full.slice(2,4), 16);
    const b = parseInt(full.slice(4,6), 16);
    return { r, g, b };
  }

  function lerp(a, b, t) { return a + (b - a) * t; }
  function lerpRgb(a, b, t) { return {
    r: Math.round(lerp(a.r, b.r, t)),
    g: Math.round(lerp(a.g, b.g, t)),
    b: Math.round(lerp(a.b, b.b, t)),
  }; }

  const defaultStart = hexToRgb('#93c5fd'); // blue-300
  const defaultEnd = hexToRgb('#fca5a5'); // red-300

  const stops = (() => {
    const arr = Array.isArray(colorrange?.color) ? colorrange.color : [];
    if (arr.length === 0) return [ { v: minV, c: defaultStart }, { v: maxV, c: defaultEnd } ];
    const parsed = arr.map((c) => ({ v: toNumber(c.minvalue, 0), c: hexToRgb(c.code || '#888888') }))
      .sort((a,b) => a.v - b.v);
    if (parsed[0]?.v > minV) parsed.unshift({ v: minV, c: parsed[0].c });
    if (parsed[parsed.length-1]?.v < maxV) parsed.push({ v: maxV, c: parsed[parsed.length-1].c });
    return parsed;
  })();

  function colorScale(v) {
    const value = toNumber(v);
    for (let i = 0; i < stops.length - 1; i += 1) {
      const a = stops[i];
      const b = stops[i + 1];
      if (value >= a.v && value <= b.v) {
        const t = (value - a.v) / ((b.v - a.v) || 1);
        const rgb = lerpRgb(a.c, b.c, t);
        return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
      }
    }
    const last = stops[stops.length - 1];
    return `rgb(${last.c.r},${last.c.g},${last.c.b})`;
  }

  const valueMap = new Map(values.map((v) => [`${v.rowid}|${v.columnid}`, v.value]));

  return (
    <g transform={`translate(${margin.left},${margin.top})`}>
      {rows.map((r, i) => (
        <text key={`r-${i}`} x={-6} y={i * cellHeight + cellHeight / 2} fontSize="12" textAnchor="end" dominantBaseline="middle" fill="#475569">{r.label}</text>
      ))}
      {columns.map((c, j) => (
        <text key={`c-${j}`} x={j * cellWidth + cellWidth / 2} y={innerHeight + 16} fontSize="12" textAnchor="middle" fill="#475569">{c.label}</text>
      ))}
      {rows.map((r, i) => (
        columns.map((c, j) => {
          const key = `${r.id}|${c.id}`;
          const v = valueMap.get(key) ?? 0;
          const x = j * cellWidth;
          const y = i * cellHeight;
          const isOtherDim = hoverKey && hoverKey !== key;
          return (
            <rect
              key={`${i}-${j}`}
              x={x}
              y={y}
              width={cellWidth}
              height={cellHeight}
              fill={colorScale(v)}
              stroke="#fff"
              strokeWidth={isOtherDim ? 0.5 : 1}
              opacity={isOtherDim ? 0.55 : 1}
              style={{ cursor: onDataClick ? 'pointer' : 'default' }}
              onClick={() => onDataClick?.({ data: { rowid: r.id, columnid: c.id, value: v, rowLabel: r.label, columnLabel: c.label } })}
              onMouseEnter={(e) => onHover?.(e, { key, label: `${r.label} / ${c.label}`, value: v })}
              onMouseMove={(e) => onHover?.(e, { key, label: `${r.label} / ${c.label}`, value: v })}
            />
          );
        })
      ))}
    </g>
  );
}

function ParetoChart({ data = [], margin = { top: 24, right: 40, bottom: 56, left: 48 }, showBars = true, showLine = true }) {
  const innerWidth = VIEWBOX_WIDTH - margin.left - margin.right;
  const innerHeight = VIEWBOX_HEIGHT - margin.top - margin.bottom;
  const values = data.map((d) => toNumber(d.value));
  const maxValue = Math.max(1, ...values);
  const total = values.reduce((a, b) => a + b, 0) || 1;
  const yScale = createLinearScale(0, maxValue, innerHeight, 0);
  const y2Scale = createLinearScale(0, 1, innerHeight, 0);
  const step = innerWidth / Math.max(1, data.length);
  const barWidth = step * 0.6;
  let cumulative = 0;
  const linePoints = data.map((d, i) => {
    cumulative += toNumber(d.value) / total;
    return { x: i * step + barWidth / 2 + (step - barWidth) / 2, y: y2Scale(cumulative) };
  });

  return (
    <g transform={`translate(${margin.left},${margin.top})`}>
      <line x1={0} y1={innerHeight} x2={innerWidth} y2={innerHeight} stroke="#CBD5E1" />
      <line x1={0} y1={0} x2={0} y2={innerHeight} stroke="#CBD5E1" />
      {/* y ticks */}
      {(() => {
        const steps = 5;
        return Array.from({ length: steps + 1 }).map((_, i) => {
          const t = i / steps;
          const val = t * maxValue;
          const y = yScale(val);
          return (
            <g key={`pyl-${i}`}>
              <line x1={0} y1={y} x2={4} y2={y} stroke="#CBD5E1" />
              <line x1={0} y1={y} x2={innerWidth} y2={y} stroke="#e5e7eb" opacity={0.35} />
              <text x={-6} y={y + 3} textAnchor="end" fontSize="10" fill="#64748B">{formatShort(Math.round(val))}</text>
            </g>
          );
        });
      })()}
      {data.map((d, i) => {
        const barHeight = innerHeight - yScale(d.value);
        const x = i * step + (step - barWidth) / 2;
        const y = innerHeight - barHeight;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barWidth} height={barHeight} rx={3} fill={showBars ? (d.color || '#94a3b8') : GRAY_COLOR} opacity={showBars ? 1 : DIM_OPACITY} />
            <text x={x + barWidth / 2} y={innerHeight + 16} textAnchor="middle" fontSize="12" fill="#475569">{d.label}</text>
          </g>
        );
      })}
      <path d={`M ${linePoints.map((p) => `${p.x} ${p.y}`).join(' L ')}`} fill="none" stroke={showLine ? '#ef4444' : GRAY_COLOR} strokeWidth={2} opacity={showLine ? 1 : DIM_OPACITY} />
    </g>
  );
}

function RadarChart({ categories = [], series = [], hiddenSeries = new Set() }) {
  const cx = VIEWBOX_WIDTH / 2;
  const cy = VIEWBOX_HEIGHT / 2;
  const radius = Math.min(VIEWBOX_WIDTH, VIEWBOX_HEIGHT) / 2 - 40;
  const angles = categories.map((_, i) => (i / categories.length) * 2 * Math.PI - Math.PI / 2);
  // Use full data range so legend dimming doesn't rescale the chart
  const maxValue = Math.max(1, getMaxFromSeries(series));
  const rScale = createLinearScale(0, maxValue, 0, radius);

  return (
    <g>
      {/* axes */}
      {angles.map((ang, i) => (
        <line key={i} x1={cx} y1={cy} x2={cx + radius * Math.cos(ang)} y2={cy + radius * Math.sin(ang)} stroke="#CBD5E1" />
      ))}
      {series.map((s, i) => {
        const isDimByLegend = hiddenSeries.has(i);
        const baseColor = s.color || RADAR_COLORS[i % RADAR_COLORS.length];
        const color = isDimByLegend ? GRAY_COLOR : baseColor;
        const points = (s?.data || []).map((d, j) => {
          const r = rScale(toNumber(d.value));
          const a = angles[j] || 0;
          return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
        });
        return (
          <g key={i}>
            <polygon points={points.join(' ')} fill={color} opacity={isDimByLegend ? 0.12 : 0.18} stroke={color} strokeWidth={2} />
            {points.map((pt, idx) => {
              const [x,y] = pt.split(',').map(Number);
              return <circle key={idx} cx={x} cy={y} r={3} fill={color} opacity={isDimByLegend ? DIM_OPACITY : 1} />;
            })}
          </g>
        );
      })}
      {categories.map((c, i) => (
        <text key={i} x={cx + (radius + 12) * Math.cos(angles[i])} y={cy + (radius + 12) * Math.sin(angles[i])} textAnchor="middle" fontSize="12" fill="#475569">{c?.label || ''}</text>
      ))}
    </g>
  );
}

function BubbleChart({ points = [], xRange = [0, 100], yRange = [0, 100], showPoints = true }) {
  const margin = { top: 24, right: 24, bottom: 32, left: 40 };
  const innerWidth = VIEWBOX_WIDTH - margin.left - margin.right;
  const innerHeight = VIEWBOX_HEIGHT - margin.top - margin.bottom;
  const xScale = createLinearScale(xRange[0], xRange[1], 0, innerWidth);
  const yScale = createLinearScale(yRange[0], yRange[1], innerHeight, 0);
  const rScale = createLinearScale(0, Math.max(1, ...points.map((p) => toNumber(p.z))), 6, 28);
  return (
    <g transform={`translate(${margin.left},${margin.top})`}>
      <line x1={0} y1={innerHeight} x2={innerWidth} y2={innerHeight} stroke="#CBD5E1" />
      <line x1={0} y1={0} x2={0} y2={innerHeight} stroke="#CBD5E1" />
      {/* ticks */}
      {Array.from({ length: 6 }).map((_, i) => {
        const t = i / 5;
        const xv = xRange[0] + t * (xRange[1] - xRange[0]);
        if (i > 0 && Math.round(xv) === 0) return null; // avoid double 0 label
        const x = xScale(xv);
        return (
          <g key={`xt-${i}`}>
            <line x1={x} y1={innerHeight} x2={x} y2={innerHeight + 4} stroke="#CBD5E1" />
            <text x={x} y={innerHeight + 16} textAnchor="middle" fontSize="10" fill="#64748B">{formatShort(Math.round(xv))}</text>
          </g>
        );
      })}
      {Array.from({ length: 6 }).map((_, i) => {
        const t = i / 5;
        const yv = yRange[0] + t * (yRange[1] - yRange[0]);
        if (i > 0 && Math.round(yv) === 0) return null; // avoid double 0 label from Y origin
        const y = yScale(yv);
        return (
          <g key={`yt-${i}`}>
            <line x1={0} y1={y} x2={4} y2={y} stroke="#CBD5E1" />
            <text x={-6} y={y + 3} textAnchor="end" fontSize="10" fill="#64748B">{formatShort(Math.round(yv))}</text>
          </g>
        );
      })}
      {/* axis labels
      <text x={innerWidth / 2} y={innerHeight + 24} textAnchor="middle" fontSize="12" fill="#475569">X</text>
      <text x={-24} y={-8} textAnchor="start" fontSize="12" fill="#475569">Y</text> */}
      {showPoints && points.map((p, i) => (
        <circle key={i} cx={xScale(toNumber(p.x))} cy={yScale(toNumber(p.y))} r={rScale(toNumber(p.z))} fill="#60a5fa" opacity={0.7} />
      ))}
    </g>
  );
}

const Chart = ({ type, width = '100%', height = '100%', dataSource, events }) => {
  const [hiddenSeries, setHiddenSeries] = useState(new Set());
  const [hiddenSlices, setHiddenSlices] = useState(new Set());
  const [hiddenBars, setHiddenBars] = useState(new Set());
  const [areaVisible, setAreaVisible] = useState(true);
  const [showParetoBars, setShowParetoBars] = useState(true);
  const [showParetoLine, setShowParetoLine] = useState(true);
  const [showBubbles, setShowBubbles] = useState(true);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, title: '', value: '', color: '' });
  const [hoverKey, setHoverKey] = useState('');
  const svgRef = useRef(null);
  const handleLegendClick = (_, payload) => {
    const idx = payload?.legendItemIndex;
    if (typeof idx !== 'number') return;
    const next = new Set(hiddenSeries);
    if (next.has(idx)) next.delete(idx); else next.add(idx);
    setHiddenSeries(next);
    events?.legendItemClicked?.(_, payload);
  };
  const handleDataClick = (ev) => {
    events?.dataPlotClick?.(ev);
  };
  const handleHover = (e, info) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left + 10;
    const y = e.clientY - rect.top + 10;
    setHoverKey(info?.key || '');
    setTooltip({ visible: true, x, y, title: info?.label || '', value: info?.value ?? '', color: info?.color || '' });
  };
  const handleMouseLeave = () => {
    setTooltip((t) => ({ ...t, visible: false }));
    setHoverKey('');
  };
  const content = useMemo(() => {
    const t = String(type || '').toLowerCase();
    if (t === 'bar2d' || t === 'column2d') {
      return <BarChart data={dataSource?.data || []} onDataClick={handleDataClick} onHover={handleHover} hoverKey={hoverKey} hiddenIndexes={hiddenBars} />;
    }
    if (t === 'doughnut2d') {
      return <PieChart data={dataSource?.data || []} innerRadius={Math.min(VIEWBOX_HEIGHT, VIEWBOX_WIDTH) / 4} onDataClick={handleDataClick} onHover={handleHover} hoverKey={hoverKey} hiddenSlices={hiddenSlices} />;
    }
    if (t === 'pie2d' || t === 'pie') {
      return <PieChart data={dataSource?.data || []} onDataClick={handleDataClick} onHover={handleHover} hoverKey={hoverKey} hiddenSlices={hiddenSlices} />;
    }
    if (t === 'scrollstackedcolumn2d' || t === 'stackedcolumn2d') {
      const categories = dataSource?.categories?.[0]?.category || [];
      const series = dataSource?.dataset || [];
      return <StackedColumnChart categories={categories} series={series} hiddenSeries={hiddenSeries} onLegendClick={handleLegendClick} onDataClick={handleDataClick} onHover={handleHover} hoverKey={hoverKey} />;
    }
    if (t === 'msline' || t === 'line') {
      const categories = dataSource?.categories?.[0]?.category || [];
      const series = dataSource?.dataset || [];
      return <LineChart categories={categories} series={series} hiddenSeries={hiddenSeries} />;
    }
    if (t === 'area2d' || t === 'msarea') {
      const categories = (dataSource?.data || []).map((d) => ({ label: d.label }));
      const series = areaVisible ? [{ data: (dataSource?.data || []) }] : [];
      return <LineChart categories={categories} series={series} area />;
    }
    if (t === 'heatmap') {
      // temporarily disabled heatmap rendering per request
      return null;
    }
    if (t === 'pareto2d' || t === 'pareto') {
      return <ParetoChart data={dataSource?.data || []} showBars={showParetoBars} showLine={showParetoLine} />;
    }
    if (t === 'radar') {
      const categories = dataSource?.categories?.[0]?.category || [];
      const series = dataSource?.dataset || [];
      return <RadarChart categories={categories} series={series} hiddenSeries={hiddenSeries} />;
    }
    if (t === 'bubble') {
      const dataset = dataSource?.dataset?.[0]?.data || [];
      const xMin = toNumber(dataSource?.chart?.xAxisMinValue, 0);
      const xMax = toNumber(dataSource?.chart?.xAxisMaxValue, 100);
      const yMin = toNumber(dataSource?.chart?.yAxisMinValue, 0);
      const yMax = toNumber(dataSource?.chart?.yAxisMaxValue, 100);
      return <BubbleChart points={dataset} xRange={[xMin, xMax]} yRange={[yMin, yMax]} showPoints={showBubbles} />;
    }
    // Fallback to simple bar
    return <BarChart data={dataSource?.data || []} onDataClick={handleDataClick} onHover={handleHover} hoverKey={hoverKey} hiddenIndexes={hiddenBars} />;
  }, [type, dataSource, hiddenSeries, hiddenSlices, hiddenBars, areaVisible, showParetoBars, showParetoLine, showBubbles, hoverKey]);

  return (
    <div className="sb-chart-stage" style={{ width: '100%', height: '100%' }}>
      <div className="sb-chart-container" onMouseLeave={handleMouseLeave}>
        <svg ref={svgRef} viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`} width="100%" height="100%" role="img" aria-label="Chart">
          {content}
        </svg>
        {tooltip.visible ? (
          <div className="sb-chart-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
            {tooltip.title ? <div style={{ fontWeight: 600, marginBottom: 2 }}>{tooltip.title}</div> : null}
            <div>{String(tooltip.value)}</div>
          </div>
        ) : null}
        {/* absolute legend for charts */}
        {(() => {
          const t = String(type).toLowerCase();
          // dataset based legends
          if (['stackedcolumn2d','scrollstackedcolumn2d','msline','radar','line'].includes(t) && Array.isArray(dataSource?.dataset)) {
            return (
              <div className="sb-chart-legend">
                {dataSource.dataset.map((s, idx) => {
                  const palette = t === 'radar' ? RADAR_COLORS : (t === 'msline' || t === 'line') ? LINE_COLORS : PASTEL_COLORS;
                  const color = resolveDisplayColor(
                    normalizeColor(s.color, palette[idx % palette.length]),
                    palette[idx % palette.length]
                  );
                  const hidden = hiddenSeries.has(idx);
                  const onClick = () => {
                    // toggle dim-only; keep set for dimming, not removal
                    setHiddenSeries((prev) => {
                      const next = new Set(prev);
                      next.has(idx) ? next.delete(idx) : next.add(idx);
                      return next;
                    });
                    events?.legendItemClicked?.(null, { legendItemIndex: idx });
                  };
                  return (
                    <div key={`lg-${idx}`} className={`sb-chart-legend__item ${hidden ? 'is-hidden' : ''}`} onClick={onClick}>
                      <span className="sb-chart-legend__swatch" style={{ background: color }} />
                      <span>{s.seriesname || `Series ${idx + 1}`}</span>
                    </div>
                  );
                })}
              </div>
            );
          }
          // pie/doughnut slices (dim slice; legend color matches slice color)
          if ((t === 'doughnut2d' || t === 'pie' || t === 'pie2d') && Array.isArray(dataSource?.data)) {
            return (
              <div className="sb-chart-legend">
                {dataSource.data.map((d, idx) => {
                  const color = resolveDisplayColor(
                    normalizeColor(d.color, DOUGHNUT_COLORS[idx % DOUGHNUT_COLORS.length]),
                    DOUGHNUT_COLORS[idx % DOUGHNUT_COLORS.length]
                  );
                  const hidden = hiddenSlices.has(idx);
                  return (
                    <div key={`lgp-${idx}`} className={`sb-chart-legend__item ${hidden ? 'is-hidden' : ''}`} onClick={() => {
                      const next = new Set(hiddenSlices);
                      next.has(idx) ? next.delete(idx) : next.add(idx);
                      setHiddenSlices(next);
                    }}>
                      <span className="sb-chart-legend__swatch" style={{ background: color }} />
                      <span>{d.label || `Slice ${idx + 1}`}</span>
                    </div>
                  );
                })}
              </div>
            );
          }
          // bar/column items
          if ((t === 'bar2d' || t === 'column2d') && Array.isArray(dataSource?.data)) {
            return (
              <div className="sb-chart-legend">
                {dataSource.data.map((d, idx) => {
                  const color = resolveDisplayColor(
                    normalizeColor(d.color, PASTEL_COLORS[idx % PASTEL_COLORS.length]),
                    PASTEL_COLORS[idx % PASTEL_COLORS.length]
                  );
                  const hidden = hiddenBars.has(idx);
                  return (
                    <div key={`lgb-${idx}`} className={`sb-chart-legend__item ${hidden ? 'is-hidden' : ''}`} onClick={() => {
                      const next = new Set(hiddenBars);
                      next.has(idx) ? next.delete(idx) : next.add(idx);
                      setHiddenBars(next);
                    }}>
                      <span className="sb-chart-legend__swatch" style={{ background: color }} />
                      <span>{d.label || `Item ${idx + 1}`}</span>
                    </div>
                  );
                })}
              </div>
            );
          }
          // area single series
          if (t === 'area2d' || t === 'msarea') {
            return (
              <div className="sb-chart-legend">
                <div className={`sb-chart-legend__item ${!areaVisible ? 'is-hidden' : ''}`} onClick={() => setAreaVisible((v) => !v)}>
                  <span className="sb-chart-legend__swatch" style={{ background: PASTEL_COLORS[0] }} />
                  <span>Series</span>
                </div>
              </div>
            );
          }
          // pareto dual items
          if (t === 'pareto2d' || t === 'pareto') {
            return (
              <div className="sb-chart-legend">
                <div className={`sb-chart-legend__item ${!showParetoBars ? 'is-hidden' : ''}`} onClick={() => setShowParetoBars((v) => !v)}>
                  <span className="sb-chart-legend__swatch" style={{ background: '#94a3b8' }} />
                  <span>Values</span>
                </div>
                <div className={`sb-chart-legend__item ${!showParetoLine ? 'is-hidden' : ''}`} onClick={() => setShowParetoLine((v) => !v)}>
                  <span className="sb-chart-legend__swatch" style={{ background: '#ef4444' }} />
                  <span>Cumulative</span>
                </div>
              </div>
            );
          }
          // bubble single group
          if (t === 'bubble') {
            return (
              <div className="sb-chart-legend">
                <div className={`sb-chart-legend__item ${!showBubbles ? 'is-hidden' : ''}`} onClick={() => setShowBubbles((v) => !v)}>
                  <span className="sb-chart-legend__swatch" style={{ background: '#93c5fd' }} />
                  <span>Points</span>
                </div>
              </div>
            );
          }
          return null;
        })()}
        {/* heatmap color scale legend */}
        {String(type).toLowerCase() === 'heatmap' ? (
          <div className="sb-chart-cscale">
            <span>{'Low'}</span>
            <span className="sb-chart-cscale__bar" style={{
              background: 'linear-gradient(90deg, #93c5fd 0%, #fca5a5 100%)'
            }} />
            <span>{'High'}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Chart;


