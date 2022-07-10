export type PaymentPopupProps = {
    onClose: () => void,
    price: number,
    onSuccess: (paymentMethod: 'Oxxo' | 'Card') => void,
    item: string,
    oxxoPayment?: boolean
}