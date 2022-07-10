import { StyleSheet, Text, View, Animated, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { vs, s } from 'react-native-size-matters';

import { colors, templates } from '../../assets/styleVariables';

// TYPES
import { BusinessPostProps } from '../../types/BusinessPostProps'
import { PostScreenProps } from '../../types/RootStackParamList';

// COMPONENTS
import Icon from '../../assets/icons';

const BusinessPost = ({title, description, image, openingHours, verified, id, opacity}: BusinessPostProps) => {
  const navigation = useNavigation<PostScreenProps>();

  return (
    <Animated.View style={{opacity}}>
      <TouchableOpacity style={templates.postPrevContainer} activeOpacity={1}
        onPress={() => {
          navigation.navigate('Post', {id});
        }}
      >

        <View style={{marginRight: vs(10)}}>
          <View style={styles.titleContainer}>
            <Text style={[templates.postPrevTitle, verified && {marginRight: s(-9)}]}>
              {title}
            </Text>
            {verified && (<Icon name="verified" size={vs(20)} color={colors.primary}/>)} 
          </View>

          <Text style={templates.postPrevDescription}>
            {description?.substring(0, 130) + "..."}
          </Text>
          
          {
            openingHours && (
              <Text style={styles.openingHours}>
                {openingHours[0]} - {openingHours[1]}
              </Text>
            )
          }
        </View>
        
        <View style={templates.postPrevImageContainer}>
          <Image source={{uri: image}} style={templates.postPrevImage}/>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default BusinessPost

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  openingHours: {
    position: 'absolute',
    bottom: vs(-8),
    right: s(5),
    fontFamily: 'GorditaBold',
    fontSize: vs(5),
    color: colors.black,
    backgroundColor: "#FFF",
    paddingHorizontal: s(8),
    paddingTop: vs(2),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.black,
  }
})