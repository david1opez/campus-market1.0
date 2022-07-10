import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { vs, s } from 'react-native-size-matters'
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/core';
import { getAuth } from "firebase/auth";

// COMPONENTS
import Icon from '../assets/icons';
import ReedemedPopup from '../components/extra/ReedemedPopup';

// HOOKS
import ReedemCode from "../hooks/promo/ReedemCode";

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';
import { colors } from '../assets/styleVariables';
type ScanQrScreenProp = StackNavigationProp<RootStackParamList, 'ScanQr'>;

const RECT_SIZE = s(65);


const ScanQr = () => {
  const navigation = useNavigation<ScanQrScreenProp>();
  const auth = getAuth();

  const [hasPermission, setHasPermission] = useState(false);
  const [couponState, setCouponState] = useState<number|null>(null);

  const uid: any = auth.currentUser?.uid;

  const ReedemCoupon = async (code: string) => {
    ReedemCode(code, uid)
    .then(result => {setCouponState(result)})
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.returnIcon}
          onPress={() => navigation.goBack()}
        >
          <Icon name="return" size={vs(27)} color="#FFF"/>
        </TouchableOpacity>
        
        <Camera type={"back"}
            style={styles.camera}
            ratio={'19:6'}
            barCodeScannerSettings={{
                barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            }}
            onBarCodeScanned={async (e) => ReedemCoupon(e.data)}
        />

        <View style={[styles.rectangleContainer, couponState != null && {opacity: 0}]}>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.rectangle1} />
                <View style={styles.rectangle2} />
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.rectangle3} />
                <View style={styles.rectangle4} />
            </View>
        </View>

        <View style={styles.logo}>
          <Icon name="logo" size={vs(50)} color={"#FFF"}/>
        </View>

        {/* POPUP */}
        {couponState !== null && <ReedemedPopup status={couponState}/>}
    </View>
  );
}

export default ScanQr

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      },
      returnIcon: {
        position: "absolute",
        top: vs(30),
        right: s(30),
        zIndex: 1
      },
      camera: {
        flex: 1,
        width: '180%',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
      },
      rectangleContainer: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(256,256,256,0.05)',
        transform: [{ translateY: vs(-60) }],
        borderRadius: 30,
      },
      rectangle1: {
        height: RECT_SIZE,
        width: RECT_SIZE,
        backgroundColor: 'transparent',
        borderTopWidth: 10,
        borderLeftWidth:10,
        borderColor: colors.primary,
        borderTopLeftRadius: 30,
        marginRight: s(90),
        marginBottom: s(90),
      },
      rectangle2: {
        height: RECT_SIZE,
        width: RECT_SIZE,
        backgroundColor: 'transparent',
        borderTopWidth: 10,
        borderRightWidth:10,
        borderColor: colors.primary,
        borderTopRightRadius: 30,
      },
      rectangle3: {
        height: RECT_SIZE,
        width: RECT_SIZE,
        backgroundColor: 'transparent',
        borderBottomWidth: 10,
        borderLeftWidth:10,
        borderColor: colors.primary,
        borderBottomLeftRadius: 30,
        marginRight: s(90),
      },
      rectangle4: {
        height: RECT_SIZE,
        width: RECT_SIZE,
        backgroundColor: 'transparent',
        borderBottomWidth: 10,
        borderRightWidth:10,
        borderColor: colors.primary,
        borderBottomRightRadius: 30,
      },
      logo: {
        position: 'absolute',
        bottom: vs(30),
      },
})
