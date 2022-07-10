import { Vibration } from 'react-native';

export default function ValidateLogin (email: string, password: string) {
    let emailError, passwordError;

    if (!email) {
        emailError = "Olvidaste ingresar tu correo";
        Vibration.vibrate(150);
    }

    if (email != "" && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
        emailError = "El correo que ingresaste no es válido"
        Vibration.vibrate(150);
    }

    if (!password) {
        passwordError = "Olvidaste ingresar tu contraseña"
        Vibration.vibrate(150);
    }

    return {emailError, passwordError}
}