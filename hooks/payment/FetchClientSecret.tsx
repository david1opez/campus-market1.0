import Constants from 'expo-constants';

const FetchClientSecret = async (price: number, paymentMethod: 'Oxxo' | 'Card') => {
    const URL = Constants?.manifest?.extra?.STRIPE_SERVER_URL
    let APIURL = paymentMethod == 'Oxxo' ? `${URL}/create-oxxo-payment-intent` : `${URL}/create-card-payment-intent`

    const response = await fetch(APIURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: price*100
        })
    })

    const {clientSecret, error} = await response.json();

    return {clientSecret, error};
}

export default FetchClientSecret;