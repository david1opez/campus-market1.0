import { useConfirmPayment } from '@stripe/stripe-react-native';
import { getAuth } from 'firebase/auth';

const MakePayment = async (clientData: {clientSecret: any, error: any}, paymentMethod: 'Oxxo' | 'Card', name?: string) => {
    const auth = getAuth();
    const { confirmPayment } = useConfirmPayment();

    const email = auth.currentUser?.email

    const {clientSecret, error} = clientData;

    if(error) {
        alert(error)
        return;
    }

    else {
        const {paymentIntent, error} = await confirmPayment(clientSecret, {
            type: paymentMethod,
            billingDetails: paymentMethod == 'Oxxo' ? {
                email: auth.currentUser?.email,
                name: name,
            } : {
                email: auth.currentUser?.email,
            }
        })

        if(error) {
            alert(error.localizedMessage)
            return;
        }
        else if(paymentIntent) {
            return true;
        }  
    }
}

export default MakePayment;