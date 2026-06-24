import type { DailyEnergyMix, OptimalWindow } from '../types/energy'

const BASE_URL = 'https://energy-backend-8wur.onrender.com/api'

export async function getEnergyMix(): Promise<DailyEnergyMix[]> {
    const response = await fetch(`${BASE_URL}/energy-mix`)
    if (!response.ok) {
        throw new Error('Failed to fetch energy mix')
    }
    return response.json()
}

export async function getOptimalWindow(hours: number): Promise<OptimalWindow> {
    const response = await fetch(`${BASE_URL}/optimal-window?hours=${hours}`)
    if (!response.ok) {
        throw new Error('Failed to fetch optimal window')
    }
    return response.json()
}