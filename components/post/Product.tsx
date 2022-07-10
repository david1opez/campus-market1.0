import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import { vs, s } from 'react-native-size-matters';

import { colors } from '../../assets/styleVariables';

// TYPES
import { ProductsProps } from '../../types/ProductsProps';

const Product = ({product, index, onSelect}: ProductsProps) => {
  return (
    <TouchableOpacity
        style={{marginBottom: vs(20)}}
        onPress={() => {
            if(index == 0) {
                onSelect(index);
            } else  {
                onSelect(index*2);
            }
        }}
    >
        <View style={styles.imageContainer}>
            {
                product.image ? (<Image source={{uri: product.image}} style={styles.image} />) : 
                (<ActivityIndicator size="large" color={colors.primary} />)
            }
            <View style={styles.darkenImage}/>
            <Text style={styles.price}>{`$ ${product.price}.00`}</Text>
        </View>
        <Text style={styles.title}>{product.title}</Text>
    </TouchableOpacity>
  )
}

export default Product

const styles = StyleSheet.create({
    imageContainer: {
        width: s(130),
        height: vs(80),
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 7,
    },
    darkenImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.45)',
        borderRadius: 7,
    },
    price: {
        position: 'absolute',
        bottom: vs(5),
        right: s(10),
        fontFamily: "GorditaBold",
        fontSize: vs(12),
        color: '#FFF',
    },
    scrollContainer: {
        height: vs(260),
        flexGrow: 0,
    },
    title: {
        fontFamily: "GorditaMedium",
        fontSize: vs(10),
        lineHeight: vs(14),
        color: colors.black,
        marginTop: vs(5),
        maxWidth: s(130),
    }
})