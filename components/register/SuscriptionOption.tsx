import { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { vs, s } from 'react-native-size-matters';

import { colors } from '../../assets/styleVariables';


const SuscriptionOption = ({title, description, price, activeOption, option, frecuency, onPress}: {title: string, description: string, price: number, activeOption: number, option: number, frecuency?: "Semanales" | "Mensuales", onPress: (option: number) => void}) => {
    const active = activeOption == option

    return(
        <TouchableOpacity style={[styles.container, active && styles.activeContainer]}
            onPress={() => {
                if(activeOption != option) onPress(option)
                else onPress(0)
            }}
        >
        <View>
            <Text style={[styles.title, active && styles.activeTitle]}>{title}</Text>
            <View style={styles.circle}><View style={active && styles.innerCircle}/></View>
        </View>

        <Text style={styles.description}>{description}</Text>

        <View style={styles.pricingContainer}>
            <View style={styles.priceContainer}>
                <Text style={styles.price}>${price}</Text>
                <Text style={styles.currency}>MXN</Text>
            </View>
            
            {frecuency && (<Text style={styles.frecuency}>{frecuency}</Text>)}
        </View>
        </TouchableOpacity>
    )
}

export default SuscriptionOption

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: s(15),
        paddingVertical: vs(10),
        marginBottom: vs(15),
        marginHorizontal: s(20),
    },
    activeContainer: {
        borderWidth: 3,
        borderColor: colors.primary,
    },
    title: {
        fontSize: vs(12),
        fontFamily: 'GorditaBold',
        color: colors.black,
        marginBottom: vs(5),
    },
    activeTitle: {
        color: colors.primary,
    },
    circle: {
        position: 'absolute',
        right: 0,
        width: vs(13),
        height: vs(13),
        borderRadius: 100,
        borderWidth: 2.5,
        borderColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerCircle: {
        width: vs(6),
        height: vs(6),
        borderRadius: 100,
        backgroundColor: colors.primary,
    },
    description: {
        fontSize: vs(8),
        lineHeight: vs(11),
        fontFamily: 'GorditaRegular',
    },
    pricingContainer: {
        alignSelf: 'flex-end',
    },
    priceContainer: {
        flexDirection: 'row',
    },
    price: {
        fontFamily: 'GorditaBold',
        fontSize: vs(12),
    },
    currency: {
        fontFamily: 'GorditaBold',
        fontSize: vs(8),
        textAlignVertical: 'bottom',
        marginBottom: vs(1.5),
        marginLeft: vs(2),
    },
    frecuency: {
        fontFamily: 'GorditaMedium',
        fontSize: vs(7),
        lineHeight: vs(9),
        textAlign: 'right',
        marginTop: vs(-2),
    },
})