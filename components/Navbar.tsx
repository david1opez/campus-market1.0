import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { vs } from 'react-native-size-matters';
import { SharedElement } from 'react-navigation-shared-element';

import { colors } from '../assets/styleVariables';

// COMPONENTS
import Icon from '../assets/icons';

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';
type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const NavButton = ({name, activeTab}: {name: string, activeTab: string}) => {
  const navigation = useNavigation<HomeScreenProp>();

  return (
    <SharedElement id={name}>
      <TouchableOpacity>
        <Icon
          name={
            name == "Promote" ? "megaphone":
            name == "Messages" ? "message":
            name == "Home" ? "home":
            name == "Stats" ? "graph":
            "store"
          }
          size={activeTab == name ? vs(27) : vs(20)}
          color={activeTab == name ? colors.primary : colors.black}
        />
      </TouchableOpacity>
    </SharedElement>
  )
}

const Navbar = ({showBannerAd, activeTab}: {showBannerAd?: boolean, activeTab: string}) => {
  return (
    <SharedElement id={"navbar"}>
      <View style={styles.container}>
        {
          ["Promote", "Messages", "Home", "Stats", "Edit"].map((button, index) => (
            <NavButton key={index} name={button} activeTab={activeTab}/>
          ))
        }
      </View>
    </SharedElement>
  )
}

export default Navbar

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-evenly",
    zIndex: 2,
    backgroundColor: '#FFF',
    width: "100%",
    height: vs(47),
    bottom: vs(-50),
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20
  },
})