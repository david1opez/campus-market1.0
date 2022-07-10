import * as ImagePicker from 'expo-image-picker';

const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) return result.uri;
};

const ConvertUriToBlob = async (uri : string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
}

export { PickImage, ConvertUriToBlob };