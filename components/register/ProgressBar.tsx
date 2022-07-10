import { StyleSheet, View } from 'react-native'
import { vs, s } from 'react-native-size-matters'

import { colors } from '../../assets/styleVariables'

const ProgressBar = ({steps, currentStep}: {steps: number, currentStep: number}) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />

      <View style={styles.stepsContainer}>
        {
          Array.from({length: steps}, (_, i) => {
            const isActive = i + 1 <= currentStep
            return (
              <View style={[styles.step, isActive && styles.activeStep]} key={i} />
            )
          })
        }
      </View>
    </View>
  )
}

export default ProgressBar

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  line: {
    position: 'absolute',
    width: '90%',
    height: vs(3),
    backgroundColor: colors.primary,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  step: {
    width: vs(15),
    height: vs(15),
    borderRadius: 20,
    borderWidth: 3,
    borderColor: colors.primary,
    backgroundColor: "#F0F0F0"
  },
  activeStep: {
    backgroundColor: colors.primary,
  }
})