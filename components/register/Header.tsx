import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import { vs, s } from 'react-native-size-matters'

import { colors } from '../../assets/styleVariables'

// COMPONENTS
import Icon from '../../assets/icons';

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList';
type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Header = ({color}: {color? : string}) => {
  const navigation = useNavigation<HomeScreenProp>();

  return (
    <View style={styles.container}>
      <Icon name="logo" size={vs(40)} color={color == "white" ? "#FFF" : colors.black}/>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <Icon name="return" size={vs(25)} color={color == "white" ? "#FFF" : colors.primary}/>
      </TouchableOpacity>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: s(15),
        paddingTop: vs(23),
        backgroundColor: 'transparent',
        width: '100%',
        zIndex: 1,
    }
})