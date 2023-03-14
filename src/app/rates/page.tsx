import Rates from '@/components/Rates'
import { fetchCurrencies } from '@/services/currencies'

export default async () => {
    const currencies = (await fetchCurrencies()).data

    return (
        <Rates currencies={currencies} />
    )
}