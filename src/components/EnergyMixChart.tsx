import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import type { DailyEnergyMix } from '../types/energy'

interface Props {
    mix: DailyEnergyMix
}

const COLORS: Record<string, string> = {
    wind:    '#3b82f6',
    solar:   '#f59e0b',
    nuclear: '#8b5cf6',
    hydro:   '#06b6d4',
    biomass: '#22c55e',
    gas:     '#ef4444',
    coal:    '#6b7280',
    imports: '#f97316',
    other:   '#94a3b8'
}

export function EnergyMixChart({ mix }: Props) {
    const data = Object.entries(mix.sources).map(([fuel, perc]) => ({
        name: fuel,
        value: Math.round(perc * 10) / 10
    }))

    const formattedDate = new Date(mix.date).toLocaleDateString('pl-PL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    })

    return (
        <div style={{ textAlign: 'center', width: '320px' }}>
            <h3 style={{ marginBottom: '4px' }}>{formattedDate}</h3>
            <p style={{
                color: '#22c55e',
                fontWeight: 'bold',
                fontSize: '18px',
                marginBottom: '8px'
            }}>
                Czysta energia: {mix.cleanEnergyPercent}%
            </p>
            <PieChart width={320} height={420}>
                <Pie
                    data={data}
                    cx={160}
                    cy={160}
                    outerRadius={120}
                    dataKey="value"
                >
                    {data.map((entry) => (
                        <Cell
                            key={entry.name}
                            fill={COLORS[entry.name] ?? '#94a3b8'}
                        />
                    ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ paddingTop: '16px' }}
                />
            </PieChart>
        </div>
    )
}