import {s, vs} from 'react-native-size-matters';
import { StyleSheet } from 'react-native';

export const colors = {
    primary: "#72E292",
    darkPrimary: "#4DC06D",
    lightPrimary: "#C6E9D0",
    black: "#3F3F3F",
    background: "#EDEFED",
    gray: "#CDCDCD",
    darkGray: "#828282",
    lightGray: "#D9D9D9",
    red: "#FA8181",
};

export const templates = StyleSheet.create({
    postPrevContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: s(315),
        marginBottom: vs(15),
    },
    postPrevTitle: {
        fontFamily: 'GorditaMedium',
        fontSize: vs(10),
        lineHeight: vs(14),
        marginBottom: vs(4),
        maxWidth: s(200),
    },
    postPrevDescription: {
        fontFamily: 'GorditaLight',
        fontSize: vs(7),
        lineHeight: vs(10),
        color: colors.black,
        marginBottom: vs(5),
        width: s(200),
        marginRight: s(10)
    },
    postPrevImageContainer: {
        width: s(100),
        height: vs(69),
      },
    postPrevImage: {
        borderRadius: 5,
        width: "100%",
        height: "100%",
    },
    closeIcon: {
        position: 'absolute',
        top: vs(7),
        right: s(10),
    },
    signInTitle: {
        fontSize: vs(20),
        lineHeight: vs(27),
        fontFamily: 'GorditaBlack',
        color: "#000",
        textAlign: 'center',
        marginBottom: vs(25),
    },
    signInContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: vs(90)
    },
    signInButton: {
        backgroundColor: colors.primary,
        paddingVertical: vs(4),
        paddingHorizontal: vs(40),
        borderRadius: 100,
        marginTop: vs(20),
        marginBottom: vs(30),
    },
    signInButtonText: {
        fontSize: vs(12),
        fontFamily: 'GorditaBold',
        color: "#FFF",
    },
})