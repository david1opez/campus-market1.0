import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { vs, s } from 'react-native-size-matters';
import { MotiView, useAnimationState } from 'moti';

import { colors } from '../../assets/styleVariables';

// COMPONENTS
import Icon from '../../assets/icons'

// TYPES
import { SearchBarProps } from '../../types/HomeScreen';

const SearchBar = ({searchValue, onFocus, onBlur}: SearchBarProps) => {
  const animationState = useAnimationState({
    from: {width: s(0)},
    to: {width: s(85)},
    active: {width: s(200)}
  })
  
  return (
    <MotiView state={animationState} style={styles.container}>
      <TextInput style={styles.input}
        placeholder= "BUSCAR ..."
        placeholderTextColor={colors.lightGray}
        onFocus={() => {
          animationState.transitionTo('active');
          onFocus();
        }}
        onBlur={() => {
          animationState.transitionTo('to');
          onBlur();
        }}
        onChangeText={searchValue}
      />
      <TouchableOpacity>
        <Icon name="search" size={25} color={colors.primary} />
      </TouchableOpacity>
    </MotiView>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: vs(25),
    marginLeft: vs(20),
  },
  input: {
    borderBottomWidth: 2,
    borderColor: colors.primary,
    fontFamily: 'GorditaMedium',
    color: colors.darkGray,
    fontSize: vs(9),
    height: vs(20),
    paddingLeft: vs(5),
    marginRight: vs(5),
    width: '100%',
  }
})