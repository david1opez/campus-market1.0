import { StyleSheet, Animated, Text, TouchableOpacity } from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import { vs, s } from 'react-native-size-matters';

import { colors, templates } from '../../assets/styleVariables';

// COMPONENTS
import Icon from '../../assets/icons';


const QrPopup = ({id, price, posX, posY, onClose}: {id: string, price: number, posX: any, posY: any, onClose: () => void}) => {
  return (
    <Animated.View
      style={[styles.container, {
          transform: [
          { translateX: posX },
          { translateY: posY },
          ],
      }]}
    >
      <TouchableOpacity
        style={templates.closeIcon}
        onPress={onClose}
      >
        <Icon name="close" size={vs(15)} color={colors.primary} />
      </TouchableOpacity>

      <Text style={styles.title}>¡¡ FELICIDADES !!</Text>
      <Text style={styles.description}>
        Ganaste un cupón de descuento de ${price}.00 mxn
        para usar en tu siguiente compra
      </Text>

      <QRCode
        value={id}
        size={vs(150)}
      />

      <Text style={styles.footer}>
        Toma una screenshot del código QR y pidele al vendedor escanearlo
        para canjearlo y aplicar el descuento :)
      </Text>
    </Animated.View>
  )
}

export default QrPopup

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFF",
      width: s(320),
      height: vs(365),
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontFamily: 'GorditaBlack',
      fontSize: s(25),
      color: colors.primary,
      marginBottom: vs(10),
    },
    description: {
      fontFamily: 'GorditaRegular',
      fontSize: vs(10),
      lineHeight: vs(12),
      color: colors.primary,
      textAlign: 'center',
      marginHorizontal: s(25),
      marginBottom: vs(30),
    },
    footer: {
      fontFamily: 'GorditaRegular',
      fontSize: vs(9),
      lineHeight: vs(12),
      color: colors.primary,
      textAlign: 'center',
      marginHorizontal: s(10),
      marginTop: vs(30),
      marginBottom: vs(10),
    },
})