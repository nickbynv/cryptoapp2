import Rates from '@/components/Rates'
import { fetchCurrencies } from '@/services/currencies'

export default async function RatesWrapper() {
    const currencies = (await fetchCurrencies()).data

    return (
        <Rates currencies={currencies} />
    )
}