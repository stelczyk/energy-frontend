import { useEffect, useState } from 'react'
import type { DailyEnergyMix } from './types/energy'
import { getEnergyMix } from './api/energyApi'
import { EnergyMixChart } from './components/EnergyMixChart'
import { ChargingForm } from './components/ChargingForm'

function App() {
    const [energyMix, setEnergyMix] = useState<DailyEnergyMix[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getEnergyMix()
            .then(data => setEnergyMix(data))
            .catch(() => setError('Nie udało się pobrać danych o miksie energetycznym'))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
            <h1>Miks energetyczny Wielkiej Brytanii</h1>

            {loading && <p>Ładowanie danych...</p>}
            {error && <p style={{ color: '#ef4444' }}>{error}</p>}

            {!loading && !error && (
                <>
                    <div style={{
                        display: 'flex',
                        gap: '32px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        marginTop: '32px'
                    }}>
                        {energyMix.map(mix => (
                            <EnergyMixChart key={mix.date} mix={mix} />
                        ))}
                    </div>

                    <hr style={{ margin: '48px 0' }} />

                    <ChargingForm />
                </>
            )}
        </div>
    )
}

export default App