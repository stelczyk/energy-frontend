export interface DailyEnergyMix {
    date: string
    sources: Record<string, number>
    cleanEnergyPercent: number
}

export interface OptimalWindow {
    start: string
    end: string
    cleanEnergyPercent: number
}