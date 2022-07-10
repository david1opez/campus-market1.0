import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {vs, s} from "react-native-size-matters";
import * as Linking from 'expo-linking';

import { colors } from "../assets/styleVariables";

// COMPONENTS
import Header from '../components/register/Header';


const ResetPassword = () => {
    const [email, setEmail] = useState('');

    const [loading, setLoading] = useState(false);

    return (
        <View style={styles.container}>

            <Header color="white"/>

            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
                <Text style={styles.description}>Ingresa el correo de tu cuenta para ayudarte</Text>

                <TextInput
                    autoCapitalize='none'
                    placeholder="ejemplo@correo.com"
                    style={styles.input}
                    placeholderTextColor={'rgba(255,255,255,0.5)'}
                    onChangeText={(text) => {setEmail(text)}}
                />

                <TouchableOpacity style={styles.button}>
                    {
                        loading ? (<ActivityIndicator size="small" color={colors.primary}/>)
                        : (<Text style={styles.buttonText}>RECUPERAR CONTRASEÑA</Text>)
                    }
                </TouchableOpacity>

                <Text style={styles.footer}>
                    Te enviaremos un correo de verificación dónde podrás restablecer tu contraseña
                </Text>

                <TouchableOpacity style={styles.contact}
                    onPress={() => Linking.openURL('mailto: campusmarket.info@gmail.com')}
                >
                    <Text style={styles.contactText}>Contactar a Servicio Técnico</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

export default ResetPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingVertical: s(20),
        alignItems: 'center',
    },
    title: {
        fontSize: vs(30),
        lineHeight: vs(35),
        fontFamily: "GorditaBold",
        color: "#FFF",
        textAlign: "center",
        marginBottom: vs(10),
    },
    description: {
        fontFamily: "GorditaRegular",
        fontSize: vs(10),
        color: "#FFF"
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#FFF",
        width: s(250),
        textAlign: "center",
        marginVertical: vs(15),
        color: "#FFF",
        fontFamily: "GorditaRegular",
    },
    button: {
        backgroundColor: "#FFF",
        paddingVertical: vs(4),
        paddingHorizontal: s(15),
        borderRadius: 100,
        marginTop: vs(10),
    },
    buttonText: {
        fontFamily: "GorditaBold",
        fontSize: vs(11),
        color: colors.primary,
    },
    footer: {
        fontFamily: "GorditaRegular",
        fontSize: vs(8),
        lineHeight: vs(12),
        color: "#FFF",
        textAlign: "center",
        marginTop: vs(10),
        width: s(240),
    },
    contact: {
        position: "absolute",
        bottom: vs(20),
    },
    contactText: {
        fontFamily: "GorditaRegular",
        fontSize: vs(9),
        color: "#FFF",
        textDecorationLine: 'underline',
    },
})