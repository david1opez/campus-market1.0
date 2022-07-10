import { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native'
import { vs, s } from 'react-native-size-matters';

import { colors } from '../../assets/styleVariables';


const NoPostsComponent = () => {
    const gifs = [
        "https://media3.giphy.com/media/iJJ6E58EttmFqgLo96/giphy.gif?cid=ecf05e472s315cmgid6yrxynx2kihemfihs8c8ix2n9tjx7e&rid=giphy.gif&ct=g",
        "https://media1.giphy.com/media/OSuaE6AknuRc7syZXp/giphy.gif?cid=ecf05e47ysntgnxrkxy1693s9842i2dbno7q7doq1i831tit&rid=giphy.gif&ct=g"
    ]

    const [url, setUrl] = useState(gifs[Math.floor(Math.random() * gifs.length)])
  return (
    <View style={{marginBottom: vs(15)}}>
        <Image source={{uri: url}} style={styles.gif}/>

        <Text style={styles.noPostsWarning}>
            Parece que aún no hay publicaciones en tu escuela
        </Text>
        
        <Text style={styles.noPostsDescription}>
            ¡Animate! puedes ser el primero en publicar lo que vendes, o puedes invitar a tus amigos a publicar :)
        </Text>
    </View>
  )
}

export default NoPostsComponent

const styles = StyleSheet.create({
    noPostsWarning: {
        fontFamily: 'GorditaMedium',
        fontSize: vs(16),
        lineHeight: vs(22),
        textAlign: 'center',
        marginTop: vs(15),
        paddingHorizontal: s(20),
        color: colors.black,
    },
    noPostsDescription: {
        fontFamily: 'GorditaRegular',
        fontSize: vs(9),
        lineHeight: vs(13),
        textAlign: 'center',
        paddingHorizontal: s(20),
        color: colors.black,
        marginTop: vs(10),
    },
    gif: {
        alignSelf: 'center',
        width: "85%",
        height: vs(170),
        borderRadius: 10,
        overlayColor: colors.background,
    }
})