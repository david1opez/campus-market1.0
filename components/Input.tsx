import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { vs, s } from 'react-native-size-matters';

import { colors } from '../assets/styleVariables';

const Input = (
    {placeholder, onTextChanged, width, error, autoCapitalize, secureTextEntry, trim, multiline, maxLenght, style, example, keyboardType}:
    {placeholder: string, onTextChanged: (value: string) => void, width?: number, error: string, autoCapitalize?: "none" | "sentences" | "words" | "characters",
     secureTextEntry?: boolean, trim?: boolean, multiline?: number, maxLenght?: number, style?: any, example?: string, keyboardType?: any}
) => {
    const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
        {
            placeholder != "" && (<Text style={styles.placeholder}>{placeholder}</Text>)
        }
        <TextInput
            style={[
                styles.input,
                {width: width || s(260)},
                {borderColor: error ? colors.red : colors.primary},
                multiline != null && styles.longInput,
                style
            ]}
            onChangeText={(value) => {
                if(trim) setValue(value.trim());
                else setValue(value);
                onTextChanged(value);
            }}
            value={value || ""}
            autoCapitalize={autoCapitalize || 'none'}
            secureTextEntry
            multiline={multiline != 0}
            numberOfLines={multiline || 1}
            maxLength={maxLenght || 30}
            placeholder={example || ""}
            placeholderTextColor={colors.lightGray}
            keyboardType={keyboardType || "default"}
        />
        {
            error != "" && (<Text style={styles.error}>{error}</Text>)
        }
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    container: {
        marginBottom: vs(10),
    },
    placeholder: {
        fontSize: vs(9),
        lineHeight: vs(16),
        fontFamily: 'GorditaMedium',
        color: colors.darkGray,
    },
    input: {
        fontSize: vs(11),
        lineHeight: vs(20),
        fontFamily: 'GorditaRegular',
        color: colors.black,
        borderBottomWidth: 2,
        textAlignVertical: 'top',
    },
    longInput: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        borderWidth: 2.5,
        paddingVertical: vs(5),
        paddingHorizontal: s(10),
        marginTop: vs(5),
        lineHeight: vs(16),
        fontSize: vs(10),
    },
    error: {
        fontSize: vs(9),
        lineHeight: vs(20),
        fontFamily: 'GorditaRegular',
        color: colors.red,
        alignSelf: 'flex-end',
    },
})