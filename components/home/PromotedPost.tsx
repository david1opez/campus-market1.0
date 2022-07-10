import { StyleSheet, Text, View, TouchableOpacity, Image, Animated} from 'react-native';
import { vs, s } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../../assets/styleVariables';

// TYPES
import { PromotedPostProps } from '../../types/PromotedPostComponent';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList';
type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;


const PromotedPost = ({image, title, description, active, id, scrollY, scale}: PromotedPostProps) => {
  const navigation = useNavigation<HomeScreenProp>();

  return (
    <Animated.View style={{
      transform: [{translateY: scrollY}, {scale}],
    }}>
      <TouchableOpacity style={styles.container} activeOpacity={1}
        onPress={() => {
          if(active == null) return;
          navigation.navigate('Post', {id})
        }}
      >

        <Image source={{uri: image}} style={styles.image} resizeMode="cover"/>

        <View style={styles.darkenImage}>
          {
            active && (
              <Text style={[styles.status, active ? styles.active : styles.inactive]}>
                {active ? "ACTIVO" : "INACTIVO"}
              </Text>
            )
          }

          <View style={styles.textContainer}>
            <Text style={styles.title}>{title?.toUpperCase()}</Text>
            <Text style={styles.description}>
              {description && description?.substring(0, 150) + "..."}
            </Text>
          </View>

        </View>

      </TouchableOpacity>
    </Animated.View>
  )
}

export default PromotedPost

const styles = StyleSheet.create({
  container: {
    width: s(280),
    height: vs(175),
    marginHorizontal: s(-5),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  darkenImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: vs(20),
    marginHorizontal: s(15),
  },
  title: {
    color: '#FFF',
    fontFamily: 'GorditaBold',
    fontSize: vs(13),
    lineHeight: vs(20),
    marginBottom: vs(2),
  },
  description: {
    color: '#FFF',
    fontFamily: 'GorditaLight',
    fontSize: vs(8),
    lineHeight: vs(10),
  },
  status: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: s(10),
    paddingTop: vs(2),
    paddingBottom: vs(1),
    marginTop: vs(10),
    marginRight: vs(10),
    borderRadius: 100,
    fontFamily: 'GorditaBold',
    fontSize: vs(6),
    opacity: 0.8,
  },
  active: {
    color: '#FFF',
    backgroundColor: colors.primary,
  },
  inactive: {
    color: '#FFF',
    backgroundColor: colors.gray,
  },
})