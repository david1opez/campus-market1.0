import { StyleSheet, Text, View, Animated, TouchableOpacity, Image } from 'react-native'
import { vs, s } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

import { colors, templates } from '../../assets/styleVariables';

// TYPES
import { StudentPostProps } from '../../types/StudentPostProps'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList';
type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;


const StudentPost = ({title, description, image, active, id, opacity}: StudentPostProps) => {
  const navigation = useNavigation<HomeScreenProp>();

  return (
    <Animated.View style={{opacity}}>
      <TouchableOpacity style={templates.postPrevContainer} activeOpacity={1}
        onPress={() => navigation.navigate('Post', {id})}
      >
        
        <View style={{marginRight: s(10)}}>
          <Text style={templates.postPrevTitle}>{title}</Text>
          <Text style={templates.postPrevDescription}>{description?.substring(0, 150) + "..."}</Text>
        </View>
        
        <View style={templates.postPrevImageContainer}>
          <Image source={{uri: image}} style={templates.postPrevImage} resizeMode="cover"/>
          <View style={styles.darkenImage} />
          <Text style={[styles.status, active == "open" ? styles.active : styles.inactive]}>
            {active == "open" ? "ACTIVO" : "INACTIVO"}
          </Text>
        </View>

      </TouchableOpacity>
    </Animated.View>
  )
}

export default StudentPost

const styles = StyleSheet.create({
  status: {
    position: 'absolute',
    bottom: vs(5),
    right: 0,
    paddingHorizontal: s(9),
    paddingVertical: vs(1),
    marginTop: vs(5),
    marginRight: vs(5),
    borderRadius: 100,
    fontFamily: 'GorditaBold',
    fontSize: vs(5),
    opacity: 0.8
  },
  active: {
    color: '#FFF',
    backgroundColor: colors.primary,
  },
  inactive: {
    color: '#FFF',
    backgroundColor: colors.gray,
  },
  darkenImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5
  }
})