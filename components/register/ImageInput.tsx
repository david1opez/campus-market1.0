import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { vs, s } from 'react-native-size-matters';

import { colors } from '../../assets/styleVariables';

// COMPONENTS
import Icon from '../../assets/icons'

// HOOKS
import { PickImage, ConvertUriToBlob } from '../../hooks/GetImage';

const ImageInput = ({onImagePicked, style} : {onImagePicked : (blob : Blob | null) => void, style?: any}) => {
    const [image, setImage] = useState("");

  return (
    <TouchableOpacity style={[styles.container, style]}
        onPress={async () => {
            const imageUrl = await PickImage();
            if (imageUrl) {
                setImage(imageUrl);
                const blob = await ConvertUriToBlob(imageUrl);
                onImagePicked(blob);
            } else {
                onImagePicked(null);
            }
        }}
    >
        {
            image == "" && (<Icon name="camera" size={27} color={colors.primary} />)
        }
        <Image source={{uri: image}} style={styles.image} resizeMode="cover"/>
    </TouchableOpacity>
  )
}

export default ImageInput

const styles = StyleSheet.create({
    container: {
        width: vs(80),
        height: vs(80),
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF"
    },
    image: {
        position: "absolute",
        width: vs(80),
        height: vs(80),
        borderRadius: 10,
    },
})