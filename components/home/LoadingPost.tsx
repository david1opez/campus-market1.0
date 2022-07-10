import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { vs, s } from 'react-native-size-matters';

import { colors } from '../../assets/styleVariables';

const LoadingPost = () => {
  return (
    <View style={styles.container}>
      <View style={{marginRight: s(20)}}>
        <View style={styles.titleBlock}/>
        <View style={styles.descriptionBlock}/>
      </View>
      <View style={styles.imageBlock}>
        <ActivityIndicator size="large" color="#fff"/>
      </View>
    </View>
  )
}

export default LoadingPost

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: s(325),
    marginBottom: vs(15),
  },
  titleBlock: {
    backgroundColor: colors.gray,
    width: s(150),
    height: vs(11),
    marginBottom: vs(5),
    borderRadius: 3,
  },
  descriptionBlock: {
    backgroundColor: colors.gray,
    width: s(190),
    height: vs(25),
    borderRadius: 3,
  },
  imageBlock: {
    backgroundColor: colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    width: s(110),
    height: vs(69),
    borderRadius: 5,
  }
})