import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { vs, s } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

import { colors, templates } from '../../assets/styleVariables';

// COMPONENTS
import Icon from '../../assets/icons';

// HOOKS
import GetAd from '../../hooks/ads/GetAd';
import UpdateAdStats from '../../hooks/ads/UpdateAdStats';

// TYPES
import { HomeScreenProps } from '../../types/RootStackParamList';


const BannerAd = ({onClose}: {onClose: () => void}) => {
  const navigation = useNavigation<HomeScreenProps>();
  
  const [adImage, setAdImage] = useState<any>(null);
  const [adID, setadID] = useState<any>(null);

  const [loading, setLoading] = useState<boolean>(true);
  
  const GetBannerAd = async () => {
    GetAd("banner").then(ad => {
      setLoading(false);
      if (ad) {
        setAdImage(ad.src);
        setadID(ad.id);
  
        UpdateAdStats(ad.id, "views");
      } else {
        onClose();
      }
    })
  }

  const AdClick = async () => {
    UpdateAdStats(adID, "clicks");
    navigation.navigate('Post', {id: adID});
  }

  useEffect(() => {
    GetBannerAd();
  }, [])

  if(loading) return null;

  return (
    <TouchableOpacity style={styles.container} onPress={AdClick}>
      
      <Image
        style={styles.image}
        source={{uri: adImage}}
        resizeMode="cover"
      />

      <TouchableOpacity style={[templates.closeIcon, {width: vs(15), height: vs(15)}]} onPress={onClose}>
        <Icon name="close" size={vs(15)} color={colors.black}/>
      </TouchableOpacity>

      <Text style={styles.adDisclaimer}>ANUNCIO</Text>

    </TouchableOpacity>
  )
}

export default BannerAd

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: vs(70),
    borderTopWidth: 3,
    borderTopColor: colors.black,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  adDisclaimer: {
    position: 'absolute',
    bottom: vs(10),
    left: s(20),
    fontFamily: 'GorditaBlack',
    fontSize: vs(5),
    color: colors.black,
    backgroundColor: '#FFF',
    textAlign: 'center',
    width: s(50),
    height: vs(12),
    paddingTop: vs(2),
    borderRadius: 20,
    opacity: 0.8
  },
  image: {
    width: '100%',
    height: '100%',
  }
})