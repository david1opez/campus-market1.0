import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { vs, s } from 'react-native-size-matters'

import { colors } from '../../assets/styleVariables'

const SelectLocation = ({onSelect, list}: {onSelect: (option: string | {name: string, shortName: string}) => void, list: string[] | {name: string, shortName: string}[]}) => {
  return (
    <View style={styles.container}>
        <View style={styles.scrollContainer}>
            <ScrollView>
                {
                    list.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => onSelect(item)}
                            style={[styles.option, index == list.length - 1 && list.length > 1 && {borderBottomColor: 'transparent'}]}
                        >
                            <Text style={styles.optionText}>{item?.name || item}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    </View>
  )
}

export default SelectLocation

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: "rgba(0,0,0,0.5)",
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
    },
    scrollContainer: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: "85%",
        maxHeight: vs(220),
        paddingHorizontal: s(20),
        paddingVertical: vs(10),
        borderRadius: 10,
    },
    option: {
        paddingVertical: vs(5),
        borderBottomWidth: 1,
        borderBottomColor: colors.black,
        marginBottom: vs(5),
    },
    optionText: {
        fontFamily: "GorditaRegular",
        fontSize: vs(10),
        color: colors.black,
    },
})