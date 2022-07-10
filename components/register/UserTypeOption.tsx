import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { vs, s } from 'react-native-size-matters'
import { colors } from '../../assets/styleVariables';

// TYPES
import { UserOptionType } from '../../types/Register';

const UserTypeOption = ({userType, activeOption, onPress, title, description, image}: {userType: UserOptionType, activeOption: UserOptionType, onPress: (userType: UserOptionType) => void, title: string, description: string, image: any}) => {
  return (
    <TouchableOpacity style={[styles.container, userType == activeOption && styles.activeContainer]}
      activeOpacity={1}
      onPress={() => onPress(userType)}
    >
      <View>
        <Text style={[styles.title, userType == activeOption && styles.activeTitle]}>{title.toUpperCase()}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Image style={styles.image} source={image} resizeMode="contain"/>
    </TouchableOpacity>
  )
}

export default UserTypeOption

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: vs(10),
    paddingHorizontal: vs(20),
    width: '95%',
    marginBottom: vs(15),
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  activeContainer: {
    borderWidth: 3,
    borderColor: colors.primary,
  },
  title: {
    fontSize: vs(14),
    lineHeight: vs(20),
    fontFamily: 'GorditaBold',
    width: s(180),
    marginBottom: vs(5),
    color: colors.black,
  },
  activeTitle: {
    color: colors.primary,
  },
  description: {
    width: s(160),
    fontFamily: 'GorditaRegular',
    fontSize: vs(8),
    lineHeight: vs(10),
  },
  image: {
    width: vs(90),
    height: vs(90),
  },
})