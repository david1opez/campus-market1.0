import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Keyboard, Vibration } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import { vs, s } from 'react-native-size-matters'; 

import { colors } from '../assets/styleVariables';

// COMPONENTS
import Input from '../components/Input';
import Header from '../components/register/Header';
import TermsAndPrivacy from '../components/TermsAndPrivacy';

// HOOKS
import ValidateLogin from '../hooks/validation/ValidateLogin';
import LoginUser from '../hooks/LoginUser'

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';
type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Login = () => {
  const navigation = useNavigation<HomeScreenProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [showTerms, setShowTerms] = useState<0|1|2>(0);

  const [keyboardActive, setKeyboardActive] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardActive(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardActive(false);
    });
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Header color="white"/>

      <View style={[styles.illustrationContainer, keyboardActive && {paddingTop: vs(30)}]}>
        <Image source={require('../assets/images/login.png')} style={styles.image} resizeMode="contain"/>
      </View>

      <Text style={styles.title}>¡TE AYUDAMOS A VENDER MÁS!</Text>

      <Input
         placeholder="Correo:"
         onTextChanged={(value) => setEmail(value)}
         error={emailError}
         trim={true}
      />

      <Input
          placeholder="Contraseña:"
          onTextChanged={(value) => setPassword(value)}
          error={passwordError}
          secureTextEntry={true}
          trim={true}
      />

      <View style={styles.accessOptionsContainer}>
        <Text style={styles.placeholder}>Acceder con:</Text>

        <View style={styles.optionsContainer}>
          <TouchableOpacity style={[styles.option, {backgroundColor: colors.primary}]}>
            <Text style={[styles.optionText, {color: "#FFF"}]}>CORREO</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}
            onPress={() => {
              LoginUser("google")
              .then(() => navigation.navigate('Home'))
              .catch(() => {
                Vibration.vibrate(150);
              })
            }}
          >
            <Text style={styles.optionText}>GOOGLE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}
          onPress={() => {
            LoginUser("apple")
            .then(() => navigation.navigate('Home'))
            .catch(() => {
              Vibration.vibrate(150);
            })
          }}>
            <Text style={styles.optionText}>APPLE</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={[styles.button, {backgroundColor: colors.primary}]}
        onPress={() => {
          const validated = ValidateLogin(email, password);
          if (validated.emailError) setEmailError(validated.emailError);
          else setEmailError('');

          if (validated.passwordError) setPasswordError(validated.passwordError);
          else setPasswordError('');
          
          if (!validated.emailError && !validated.passwordError) {
            LoginUser("email", email, password)
            .then(() => navigation.navigate('Home'))
            .catch((err) => {
              if (err.code === 'auth/user-not-found') {
                setEmailError('Este correo aún no está registrado');
                Vibration.vibrate(150);
              }
              if (err.code === 'auth/wrong-password') {
                setPasswordError('Contraseña incorrecta');
                Vibration.vibrate(150);
              }
              // auth/network-request-failed
            });
          }

        }}
      >
        <Text style={[styles.buttonText, {color: "#FFF"}]}>INICIAR SESIÓN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={styles.forgotPassword}>¿Olvidaste tú contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate('Register_UserType')}
      >
        <Text style={styles.buttonText}>REGISTRARSE</Text>
      </TouchableOpacity>

      {
        !keyboardActive && (
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => setShowTerms(1)}
            >
              <Text style={styles.footerText}>Términos de uso</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowTerms(2)}
            >
              <Text style={styles.footerText}>Aviso de Privacidad</Text>
            </TouchableOpacity>
          </View>
        )
      }

      {
        showTerms != 0 && (
          <TermsAndPrivacy
            onClose={() => setShowTerms(0)}
            activeTab={showTerms}
          />
        )
      }
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  illustrationContainer: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    width: '100%',
    paddingTop: vs(70),
    marginBottom: vs(30),
  },
  image: {
    width: vs(160),
    height: vs(160),
  },
  title: {
    fontFamily: 'GorditaBlack',
    fontSize: s(27),
    lineHeight: s(37),
    marginBottom: vs(20),
    textAlign: 'center',
    width: s(300),
    color: colors.black,
  },
  accessOptionsContainer: {
    width: s(260),
    marginBottom: vs(10),
  },
  placeholder: {
    fontSize: vs(9),
    lineHeight: vs(16),
    fontFamily: 'GorditaMedium',
    color: colors.darkGray,
    alignSelf: 'flex-start',
    marginBottom: vs(5),
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
  },
  option: {
    backgroundColor: "#FFF",
    paddingHorizontal: s(20),
    paddingVertical: s(2),
    borderRadius: 30,
  },
  optionText: {
    color: colors.primary,
    fontSize: vs(8),
    lineHeight: vs(16),
    fontFamily: 'GorditaBold',
  },
  button: {
    paddingHorizontal: s(25),
    paddingTop: vs(5),
    paddingBottom: vs(2),
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.primary,
    marginTop: vs(10),
  },
  buttonText: {
    fontFamily: 'GorditaBold',
    fontSize: vs(12),
    lineHeight: vs(16),
    color: colors.primary,
  },
  forgotPassword: {
    fontSize: vs(9),
    lineHeight: vs(16),
    fontFamily: 'GorditaRegular',
    textDecorationLine: 'underline',
    color: colors.primary,
    marginTop: vs(5),
  },
  footer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: s(200),
    bottom: vs(20),
  },
  footerText: {
    fontSize: vs(9),
    lineHeight: vs(16),
    fontFamily: 'GorditaRegular',
    textDecorationLine: 'underline',
    color: colors.darkGray,
  },
})