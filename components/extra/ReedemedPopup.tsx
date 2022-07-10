import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Vibration } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import { vs, s } from 'react-native-size-matters';
import { MotiView } from 'moti';

import { colors, templates } from '../../assets/styleVariables';

// COMPONENTS
import Icon from '../../assets/icons';

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList';
type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;


const ReedemedPopup = ({status}: {status: number}) => {
  const navigation = useNavigation<HomeScreenProp>();

  useEffect(() => {
    if(status > 1) Vibration.vibrate(200);
  }, [])

  return (
    <MotiView style={styles.container}
        from={{
            transform: [{
                translateY: vs(500),
            }]
        }}
        animate={{
            transform: [{
                translateY: 0,
            }]
        }}
    >
        <TouchableOpacity style={templates.closeIcon}
          onPress={() => navigation.goBack()}
        >
          <Icon name="close" size={vs(18)} color={colors.primary}/>
        </TouchableOpacity>

        {
            status <= 1 ? (
                <View>
                    <Text style={styles.title}>
                        {status === 0 ? 'Cupón inválido' : 'Cupón ya utilizado'}
                    </Text>
                    <Text style={styles.description}>
                        {
                            status === 0 ? "El código del cupón que intentas canjear no existe. Revisa que el código sea el correcto." :
                            "El cupón que intentas canjear ya ha sido utilizado antes."
                        }
                    </Text>
                </View>
            ) : (
                <View>
                    <Text style={[styles.title, {color: colors.primary}]}>
                        ¡CUPÓN CANJEADO!
                    </Text>

                    <View>
                        <Text style={styles.price}>
                            ${status}.00
                        </Text>

                        <Text style={styles.priceDescription}>
                            MXN de descuento
                        </Text>
                    </View>
                </View>
            )
        }
    </MotiView>
  )
}

export default ReedemedPopup

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        width: '90%',
        borderRadius: 10,
        paddingVertical: vs(20),
    },
    title: {
        fontFamily: 'GorditaBold',
        fontSize: vs(14),
        lineHeight: vs(20),
        textAlign: 'center',
        color: colors.black,
        marginBottom: vs(5),
    },
    description: {
        fontFamily: 'GorditaRegular',
        fontSize: vs(10),
        lineHeight: vs(15),
        textAlign: 'center',
        color: colors.black,
        marginHorizontal: s(20),
        marginBottom: vs(10),
    },
    price: {
        fontFamily: 'GorditaBold',
        fontSize: vs(25),
        color: colors.black,
        textAlign: 'center',
    },
    priceDescription: {
        fontFamily: 'GorditaMedium',
        fontSize: vs(10),
        color: colors.black,
        textAlign: 'center',
        marginBottom: vs(12),
    }
})