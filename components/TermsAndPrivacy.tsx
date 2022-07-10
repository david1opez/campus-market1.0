import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { vs, s } from 'react-native-size-matters';

import { colors, templates } from '../assets/styleVariables';

// COMPONENTS
import Icon from '../assets/icons';


const TermsAndPrivacy = ({onClose, activeTab}: {onClose: () => void, activeTab: 1 | 2}) => {
    const privacy_policy = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";
    const terms_of_use = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";

  return (
    <View style={styles.contentContainer}>
        <View style={styles.container}>
        <TouchableOpacity
            style={templates.closeIcon}
            onPress={onClose}
        >
            <Icon name="close" size={vs(15)} color={colors.primary} />
        </TouchableOpacity>

        <Text style={styles.title}>
            {activeTab === 2 ? 'AVISO DE PRIVACIDAD' : 'TÉRMINOS DE USO'}
        </Text>

        <View style={styles.scrollContainer}>
            <ScrollView>
                <Text style={styles.text}>
                    {activeTab === 2 ? privacy_policy : terms_of_use}
                </Text>
            </ScrollView>
        </View>
      </View>
    </View>

  )
}

export default TermsAndPrivacy

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
        backgroundColor: "#FFF",
        borderRadius: 10,
        paddingHorizontal: s(15),
        paddingTop: vs(25),
        paddingBottom: vs(30),
        marginBottom: vs(30),
    },
    title: {
        fontFamily: 'GorditaBlack',
        fontSize: s(16),
        textDecorationLine: 'underline',
        marginBottom: vs(10),
    },
    scrollContainer: {
        width: '100%',
        height: vs(248),
    },
    text: {
        fontFamily: 'GorditaRegular',
        fontSize: s(10),
        lineHeight: vs(14),
    },

})