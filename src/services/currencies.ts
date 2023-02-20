import { ICurrenciesResponse } from '@/entities/currencies'
import { API_KEY, BASE_URL } from '.'

export async function fetchCurrencies() {
    const response = await fetch(`${BASE_URL}/currencies?api_key=${API_KEY}`)
    return await response.json() as ICurrenciesResponse
}