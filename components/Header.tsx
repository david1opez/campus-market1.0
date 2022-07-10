import { useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, PanResponder, Animated } from 'react-native'
import { vs, s } from 'react-native-size-matters';
import { MotiView } from 'moti';
import { useNavigation } from '@react-navigation/core';

import { colors } from '../assets/styleVariables';

// COMPONENTS
import Icon from '../assets/icons';

// TYPES
import { HeaderProps } from '../types/HeaderComponent';
import { HomeScreenProps } from '../types/RootStackParamList';

const Header = ({type, userType, onReload, onReturn, onSettings}: HeaderProps) => {
  const navigation = useNavigation<HomeScreenProps>();

  const scrollY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        scrollY.setValue(gesture.dy);
      },
      onPanResponderRelease: (event, gesture) => {
        if(gesture.dy >= vs(200)) {
          onReload && onReload();
          Animated.spring(scrollY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
        else {
          Animated.spring(scrollY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const inputRange = [0, vs(120), vs(420)]

  const translateY = scrollY.interpolate({
    inputRange,
    outputRange: [vs(-40), vs(110), vs(140)],
    extrapolate: 'clamp',
  });

  const rotate = scrollY.interpolate({
    inputRange,
    outputRange: ['0deg', '-360deg', '-420deg'],
    extrapolate: 'clamp',
  });


  if(type === "transparent") {
    return (
      <View style={styles.tranparentContainer} {...panResponder.panHandlers}>

        {/* RELOAD ICON */}
        <Animated.View
          style={[styles.reload, {transform: [
            {translateY},
            {rotate}
          ]}]}
        >
          <Icon name="reload" size={vs(17)} color={colors.primary}/>
        </Animated.View>

        {/* LOGO */}
        <Icon name="logo" size={vs(40)} color={colors.black}/>

        {/* BUTTONS */}
        <View style={styles.buttonsContainer}>
          {
            userType != "none" && userType != "client" && (
              <TouchableOpacity
                style={{marginTop: vs(3), marginRight: s(10)}}
                onPress={() => navigation.navigate("ScanQr")}
              >
                <Icon name="qr" size={vs(22)} color={colors.primary}/>
              </TouchableOpacity>
            )
          }
          {
            userType === "none" && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
                style={{marginRight: s(10), marginTop: vs(2.5)}}
              >
                <Text style={styles.buttonText}>ACCEDER</Text>
              </TouchableOpacity>
            )
          }

          <TouchableOpacity
            style={{marginTop: vs(1.5)}}
            onPress={() => onSettings && onSettings()}
          >
            <Icon name="settings" size={vs(20)} color={colors.black}/>
          </TouchableOpacity>
        </View>

        {/* BOTTOM LINE */}
        <View style={styles.div} />
      </View>
    )
  }
  
  return (
    <MotiView style={styles.greenContainer}
      from={{
        transform: [{translateY: vs(-35)}],
        height: vs(0),
      }}
      animate={{
        transform: [{translateY: vs(-7)}],
        height: vs(70),
      }}
    >
      {/* LOGO */}
      <Icon name="logo" size={vs(40)} color={"#FFF"}/>

      {/* RETURN ICON */}
      <TouchableOpacity onPress={() => {onReturn && onReturn()}}>
        <Icon name="return" size={vs(25)} color={"#FFF"}/>
      </TouchableOpacity>
    </MotiView>
  )
}

export default Header

const styles = StyleSheet.create({
  tranparentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: s(15),
    paddingTop: vs(23),
    marginBottom: vs(30),
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: s(20),
    paddingTop: vs(25),
    height: vs(62),
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  buttonText: {
    backgroundColor: "#FFF",
    fontFamily: 'GorditaBold',
    color: colors.black,
    fontSize: vs(8),
    paddingLeft: s(15),
    paddingRight: s(14),
    paddingTop: s(3.5),
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: colors.black,
    marginLeft: s(9),
  },
  div: {
    height: 2,
    backgroundColor: colors.black,
    position: 'absolute',
    bottom: vs(-3),
    width: '90%',
    left: '10%',
  },
  reload: {
    position: 'absolute',
    width: vs(25),
    height: vs(25),
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    zIndex: 1,
    left: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})