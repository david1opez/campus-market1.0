import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Animated, PanResponder, TouchableOpacity, Image } from 'react-native'
import { MotiView } from 'moti';
import { vs, s } from 'react-native-size-matters';

import { colors, templates } from '../../assets/styleVariables';
// COMPONENTS
import Icon from '../../assets/icons';

// TYPES
import { Product } from '../../types/ProductsProps';

const Card = ({title, description, price, image, animatedValues, onClose}) => {
    return (
        <Animated.View {...animatedValues.panResponder.panHandlers}
            style={[
                styles.cardContainer, 
                {transform: [
                    { translateX: animatedValues.posX },
                    { translateY: animatedValues.posY },
                    { rotate: animatedValues.rotation }
                ]}
            ]}
        >
            <TouchableOpacity style={templates.closeIcon}
                onPress={() => {onClose()}}
            >
                <Icon name="close" size={vs(15)} color={colors.primary} />
            </TouchableOpacity>

            <Image source={{uri: image}} style={styles.image} resizeMode="cover" />

            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>{`$ ${price}.00`}</Text>
            </View>

        </Animated.View>
    )
}

const ProductsCards = ({product, onClose}:{product: Product, onClose: () => void}) => {
    const [showPopup, setShowPopup] = useState(true);

    const posX = useRef(new Animated.Value(0)).current;
    const posY = useRef(new Animated.Value(0)).current;

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

            Animated.spring(posY, {
                toValue: 0,
                useNativeDriver: true
            }).start();
    
            if(X <= s(200)) {
            Animated.spring(posX, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
            } else {
                Animated.spring(posX, {
                    toValue: gesture.dx > 0 ? s(400): s(-400),
                    useNativeDriver: true,
                }).start();

                setTimeout(() => {
                    setShowPopup(false);
                    onClose();
                }, 500);
            }
        },
        })
    ).current;

    const rotation = posX.interpolate({
        inputRange: [-s(255), 0, s(255)],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp',
    });

    const Y = posY.interpolate({
        inputRange: [vs(-200), 0, vs(200)],
        outputRange: [vs(-20), 0, vs(20)],
        extrapolate: 'clamp',
    });

    return (
        <MotiView style={styles.container}
            from={{opacity: 0}}
            animate={{opacity: 1}}
        >
            <Card
                title={product.title}
                description={product.description}
                price={product.price}
                image={product.image}
                animatedValues={{panResponder,posX,posY: Y,rotation}}
                onClose={() => {
                    setShowPopup(false);
                    onClose();
                }}
            />
        </MotiView>
    )
}

export default ProductsCards

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    cardContainer: {
        flexDirection: 'row',
        width: s(330),
        height: s(250),
        borderRadius: 10,
        backgroundColor: '#FFF',
        position: 'absolute',
        alignSelf: 'center',
        top: vs(220),
    },
    image: {
        width: "50%",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    textContainer: {
        width: "50%",
        paddingHorizontal: s(10),
        justifyContent: 'center',
        zIndex: -1
    },
    title: {
        fontFamily: "GorditaBold",
        fontSize: vs(14),
        lineHeight: vs(17),
        alignSelf: 'center',
    },
    description: {
        fontFamily: "GorditaLight",
        fontSize: vs(8.5),
        lineHeight: vs(11),
        alignSelf: 'center',
        marginVertical: vs(8),
        textAlign: 'center',
    },
    price: {
        fontFamily: "GorditaBlack",
        color: colors.primary,
        textAlign: "right",
        fontSize: vs(18),
        alignSelf: "center",
    },
})