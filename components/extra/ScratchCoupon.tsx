import { useEffect, useRef, useState } from 'react';
import { StyleSheet, PanResponder, Animated, TouchableOpacity, Text } from 'react-native';
import { MotiView } from 'moti';
import { vs, s } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { colors, templates } from '../../assets/styleVariables';

// COMPONENTS
import Icon from '../../assets/icons';
import QrPopup from './QrPopup';
import ScratchGrid from './ScratchGrid';

// HOOKS
import { GetCode } from '../../hooks/promo/GetCode';

const ScratchCoupon = ({user, onClose}: {user: string, onClose: () => void}) => {
  const posX = useRef(new Animated.Value(0)).current;
  const posY = useRef(new Animated.Value(0)).current;
  
  const [showQr, setShowQr] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [code, setCode] = useState<string>("")

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        posX.setValue(gesture.dx);
        posY.setValue(gesture.dy);
      },
      onPanResponderRelease: (event, gesture) => {
        const X = Math.abs(gesture.dx);
        const Y = Math.abs(gesture.dy);

        if(Y <= vs(250)) {
          Animated.spring(posY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        } else {
          onClose();
        }
        if(X <= s(200)) {
          Animated.spring(posX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
          onClose;
        } else {
          onClose();
        }
      },
    })
  ).current;

  const opacity = posX.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [0, 1, 0],
  });

  return (
    <Animated.View style={[styles.contentContainer, {opacity}, user!="" && {height: "108%"}]} {...panResponder.panHandlers}>

      {/* SCRATCH POPUP */}
      {
        !showQr && (
          <MotiView
            from={{
              transform: [{scale: 0}]
            }}
            animate={{
              transform: [{scale: 1}]
            }}
            transition={{
              delay: 200,
              duration: 300,
            }}
          >
            <Animated.View
              style={[styles.container, {
                transform: [
                  { translateX: posX },
                  { translateY: posY },
                ],
              }]}
            >
              {/* CLOSE ICON */}
              <TouchableOpacity onPress={() => onClose()} style={templates.closeIcon}>
                <Icon name="close" size={vs(15)} color={colors.primary} />
              </TouchableOpacity>

              {/* TITLE & DESCRIPTION */}
              <Text style={styles.title}>¡OBTÉN HASTA $10 PESOS DE DESCUENTO!</Text>
              <Text style={styles.description}>
                Prueba tu suerte, escoge un cuadro de debajo
                y descubre de cuanto es tú cupón de descuento
              </Text>

              {/* GRID */}
              <ScratchGrid
                onSelect={async (discount) => {
                  setDiscount(discount);
                  
                  try {await AsyncStorage.setItem('@code', "NO_COUPON")}
                  catch (err) {console.log(err)}

                  if(discount > 0) {
                    GetCode(discount).then((code: any) => {
                      if(code != null) {
                        setCode(code)
                        setShowQr(true)
                      }
                    })
                  }
                }}
              />

              {/* FOOTER */}
              <Text style={styles.footer}>
                Es lo mejor que podemos hacer, no tenemos tanto dinero :')
              </Text>
                    
            </Animated.View>
          </MotiView>
        )
      }
      

      {/* QR CODE POPUP */}
      {
        showQr && (
          <MotiView
            from={{
              transform: [{scale: 0}]
            }}
            animate={{
              transform: [{scale: 1}]
            }}
            transition={{
              delay: 200,
              duration: 300,
            }}
          >
            <QrPopup
              price={discount}
              posX={posX}
              posY={posY}
              onClose={() => {onClose()}}
              id={code}
            />
          </MotiView>
        )
      }

    </Animated.View>
  )}

export default ScratchCoupon

const styles = StyleSheet.create({
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: s(320),
    height: vs(355),
    marginBottom: vs(40),
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'GorditaBlack',
    fontSize: s(18),
    lineHeight: vs(24),
    color: colors.primary,
    marginTop: vs(30),
    marginBottom: vs(10),
    marginHorizontal: s(25),
  },
  description: {
    textAlign: 'center',
    fontFamily: 'GorditaRegular',
    fontSize: s(9),
    lineHeight: s(12),
    color: colors.primary,
    marginHorizontal: s(16),
  },
  footer: {
    textAlign: 'center',
    color: colors.darkGray,
    fontFamily: 'GorditaRegular',
    fontSize: s(8),
    marginTop: vs(10),
  }
})