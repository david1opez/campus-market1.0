import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { vs, s } from 'react-native-size-matters';

import { colors } from '../../assets/styleVariables';

// TYPES
import { CategoryProps } from '../../types/HomeScreen';


const Category = ({name, activeCategory, onPress}: CategoryProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[
        styles.category,
        name == "OTROS" && {marginRight: s(40)},
        activeCategory == name && {backgroundColor: colors.primary}
      ]}
    >
      <Text style={[styles.categoryText, activeCategory == name ? styles.activeText : styles.inactiveText]}>
        {name}
      </Text>
    </TouchableOpacity>
  )
}

export default Category

const styles = StyleSheet.create({
  category: {
    paddingHorizontal: s(15),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.black,
    marginRight: s(8),
    height: vs(15),
    justifyContent: 'center',
    backgroundColor: "transparent",
  },
  categoryText: {
    fontSize: vs(7),
  },
  activeText: {
    fontFamily: "GorditaBold",
    color: "#FFF",
  },
  inactiveText: {
    fontFamily: "GorditaMedium",
    color: colors.black,
  },
})