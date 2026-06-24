import { useState } from 'react'
import type { OptimalWindow } from '../types/energy'
import { getOptimalWindow } from '../api/energyApi'

export function ChargingForm() {
    const [hours, setHours] = useState(1)
    const [result, setResult] = useState<OptimalWindow | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit() {
    if (hours < 1 || hours > 6) {
        setError('Czas ładowania musi być między 1 a 6 godzinami')
        return
    }
        setLoading(true)
        setError(null)

        try {
            const data = await getOptimalWindow(hours)
            setResult(data)
        } catch (e) {
            setError('Nie udało się pobrać danych')
        } finally {
            setLoading(false)
        }
    }

    const formatDateTime = (dateTime: string) => {
        return new Date(dateTime).toLocaleString('pl-PL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '24px' }}>
            <h2>Kiedy naładować samochód?</h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
                <label>Czas ładowania:</label>
                <input
                    type="number"
                    min={1}
                    max={6}
                    value={hours}
                    onChange={e => setHours(parseInt(e.target.value))}
                    style={{ width: '60px', padding: '8px' }}
                />
                <span>godzin</span>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: loading ? '#9ca3af' : '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Szukam...' : 'Znajdź okno'}
                </button>
            </div>

            {error && (
                <p style={{ color: '#ef4444', marginTop: '12px' }}>{error}</p>
            )}

            {result && (
                <div style={{
                    marginTop: '24px',
                    padding: '20px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    backgroundColor: '#f8fafc'
                }}>
                    <h3 style={{ color: '#22c55e' }}>Najlepszy czas na ładowanie:</h3>
                    <p><strong>Start:</strong> {formatDateTime(result.start)}</p>
                    <p><strong>Koniec:</strong> {formatDateTime(result.end)}</p>
                    <p><strong>Czysta energia:</strong> {result.cleanEnergyPercent}%</p>
                </div>
            )}
        </div>
    )
}