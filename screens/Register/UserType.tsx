import { useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core';

import { templates } from '../../assets/styleVariables';

// COMPONENTS
import UserTypeOption from '../../components/register/UserTypeOption';
import ProgressBar from '../../components/register/ProgressBar';
import Header from '../../components/register/Header';

// TYPES
import { UserOptionType } from '../../types/Register';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList';
type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const UserType = () => {
  const navigation = useNavigation<HomeScreenProp>();

  const [activeOption, setActiveOption] = useState<UserOptionType>('student');

  return (
    <View style={templates.signInContainer}>
      <Header/>

      <Text style={templates.signInTitle}>¿CUÁL OPCIÓN TE DESCRIBE MEJOR?</Text>

      <UserTypeOption
        activeOption={activeOption}
        onPress={(userType) => setActiveOption(userType)}
        userType={'student'}
        title="Estudiante emprendedor"
        description="Eres estudiante del campus donde ofreces tus servicios y tu negocio apenas va empezando."
        image={require('../../assets/images/student.png')}
      />

      <UserTypeOption
        activeOption={activeOption}
        onPress={(userType) => setActiveOption(userType)}
        userType={'business'}
        title="Pequeño negocio"
        description="Tienes un local pequeño cerca del campus y tus principales clientes son los estudiantes."
        image={require('../../assets/images/business.png')}
      />

      <UserTypeOption
        activeOption={activeOption}
        onPress={(userType) => setActiveOption(userType)}
        userType={'client'}
        title="Cliente"
        description="De momento no piensas vender nada en la aplicación, pero quieres ver lo que tienen que ofrecer los demás."
        image={require('../../assets/images/client.png')}
      />

      <TouchableOpacity
        style={templates.signInButton}
        onPress={() => {
          activeOption != 'client' ? navigation.navigate("Register_StoreDetails", {userType: activeOption})
          : navigation.navigate("Register_UserDetails", { userType: activeOption })
        }}
      >
        <Text style={templates.signInButtonText}>SIGUIENTE</Text>
      </TouchableOpacity>

      <ProgressBar steps={4} currentStep={1} />

    </View>
  )
}

export default UserType