import { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { vs, s } from 'react-native-size-matters'

import { colors, templates } from '../../assets/styleVariables';

// COMPONENTS
import Header from '../../components/register/Header';
import Input from '../../components/Input';
import ProgressBar from '../../components/register/ProgressBar';
import SuscriptionOption from '../../components/register/SuscriptionOption';


const UserDetails = ({route}: any) => {
  const userType = route.params.userType;
  const data = route.params.data;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [registerOption, setRegisterOption] = useState(0);

  const [suscription, setSuscription] = useState(0);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  return (
    <View style={templates.signInContainer}>
      <Header/>

      <Text style={templates.signInTitle}>CUENTANOS UN POCO SOBRE TÚ NEGOCIO</Text>

      <Input
        placeholder="Nombre:"
        onTextChanged={(value) => setName(value)}
        error={nameError}
      />

      <View style={styles.accessOptionsContainer}>
        <Text style={styles.placeholder}>Acceder con:</Text>

        <View style={styles.optionsContainer}>
          <TouchableOpacity style={[styles.option, registerOption == 0 && {backgroundColor: colors.primary}]}
            onPress={() => setRegisterOption(0)}
          >
            <Text style={[styles.optionText, registerOption == 0 && {color: "#FFF"}]}>CORREO</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.option, registerOption == 1 && {backgroundColor: colors.primary}]}
            onPress={() => setRegisterOption(1)}
          >
            <Text style={[styles.optionText, registerOption == 1 && {color: "#FFF"}]}>GOOGLE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.option, registerOption == 2 && {backgroundColor: colors.primary}]}
            onPress={() => setRegisterOption(2)}
          >
            <Text style={[styles.optionText, registerOption == 2 && {color: "#FFF"}]}>APPLE</Text>
          </TouchableOpacity>
        </View>
      </View>

      {
        registerOption === 0 && (
          <Input
            placeholder="Correo:"
            onTextChanged={(value) => setEmail(value)}
            error={emailError}
            trim={true}
          />
        )
      }
      {
        registerOption === 0 && (
          <Input
            placeholder="Contraseña:"
            onTextChanged={(value) => setPassword(value)}
            error={passwordError}
            secureTextEntry={true}
            trim={true}
          />
        )
      }

      <Text style={styles.placeholder}>Suscripción:</Text>

      <View style={[styles.scrollContainer, userType == "client" && {height: vs(150)}]}>
        <ScrollView>
          {
            userType != "client" ? (
              <View>
                <SuscriptionOption
                  title="GRATIS"
                  description="Puedes publicar tu producto o servicio en nuestra plataforma por el tiempo que desees pero con posibilidades limitadas y sin acceso a funcionalidades premium"
                  activeOption={suscription}
                  option={0}
                  price={0.00}
                  onPress={(option) => {setSuscription(option)}}
                />
                <SuscriptionOption
                  title="ESTUDIANTE"
                  description="Puedes anunciarte en nuestra plataforma teniendo acceso a funciones premium como poder agregar múltiples imágenes principales, productos ilimitados y elegir otras formas de contacto (Whatsapp, Messenger e Instagram)"
                  activeOption={suscription}
                  option={1}
                  price={12.00}
                  onPress={(option) => {setSuscription(option)}}
                  frecuency="Semanales"
                />
                <SuscriptionOption
                  title="NEGOCIO"
                  description="Puedes anunciarte en nuestra plataforma con acceso a todas las funciones premium, incluyendo además, el poder mostrar la ubicación de tu negocio y tu horario de atención. También podrás comprar anuncios (banners, popups y videos) dentro de la aplicación"
                  activeOption={suscription}
                  option={2}
                  price={100.00}
                  onPress={(option) => {setSuscription(option)}}
                  frecuency="Mensuales"
                />
              </View>
            ) : (
              <SuscriptionOption
                title="ELIMINAR ANUNCIOS"
                description="Deshazte, para siempre, de todos los molestos anuncios en la aplicación"
                activeOption={suscription}
                option={3}
                price={25.00}
                onPress={(option) => {setSuscription(option)}}
              />
            )
          }
        </ScrollView>
      </View>

      <TouchableOpacity
        style={[templates.signInButton, name != "" && email != "" && password != "" && registerOption == 0 && {backgroundColor: colors.gray}]}
        onPress={() => {
          if(registerOption == 0) {}
          else if(registerOption == 1) {}
          else {}
        }}
      >
        <Text style={templates.signInButtonText}>REGISTRARSE</Text>
      </TouchableOpacity>

      <ProgressBar steps={data?.items ? 3 : 4} currentStep={data?.items  ? 3 : 4} />

    </View>
  )
}

export default UserDetails

const styles = StyleSheet.create({
  placeholder: {
    fontSize: vs(9),
    lineHeight: vs(16),
    fontFamily: 'GorditaMedium',
    color: colors.darkGray,
    alignSelf: 'flex-start',
    marginBottom: vs(5),
    marginTop: vs(10),
    paddingLeft: s(45),
  },
  scrollContainer: {
    height: vs(160),
    marginTop: vs(5),
  },
  accessOptionsContainer: {
    width: "100%",
    marginBottom: vs(15),
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  option: {
    paddingHorizontal: s(15),
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  optionText: {
    color: colors.primary,
    fontSize: vs(7),
    lineHeight: vs(16),
    fontFamily: 'GorditaBold',
  },
})