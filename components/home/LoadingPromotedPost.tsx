import { StyleSheet, ActivityIndicator, View, Animated } from 'react-native'
import {vs, s} from 'react-native-size-matters'
import { colors } from '../../assets/styleVariables'

const LoadingPromotedPost = ({scale, scrollY}: any) => {
  return (
    <Animated.View style={
      [styles.container, {
        transform: [
          {translateY: scrollY},
          {scale}
        ]
      }]
    }>
      <ActivityIndicator size="large" color={"#FFF"} />
    </Animated.View>
  )
}

export default LoadingPromotedPost

const styles = StyleSheet.create({
  container: {
    width: s(280),
    height: vs(175),
    marginLeft: vs(-10),
    backgroundColor: colors.gray,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})