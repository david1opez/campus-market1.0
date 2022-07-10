import { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Video } from 'expo-av';
import { s, vs } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../../assets/styleVariables';

// HOOKS
import GetAd from '../../hooks/ads/GetAd';

// TYPES
import { HomeScreenProps } from '../../types/RootStackParamList';

const VideoAd = ({user, onClose}: {user: string, onClose: () => void}) => {
  const navigation = useNavigation<HomeScreenProps>();

  const video = useRef(null);
  
  const [ad, setAd] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [countdown, setCountdown] = useState<number>(7);

  const updateCountdown = async () => {
    if (countdown > 0) {
      setCountdown(countdown - 1);
    }
  }

  const GetVideoAd = async () => {
    GetAd("video").then(data => {
      setLoading(false);
      if (data) {
        setAd(data);
      } else {
        onClose();
      }
    })
  }

  useEffect(() => {
    GetVideoAd();
  }, []);

  useEffect(() => {
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  if(!ad) return null;

  return (
    <View style={[styles.container, user!="" && {height: "108%"}]}>
      <View style={styles.popupContainer}>

        <Text style={styles.title}>{ad?.title.toUpperCase()}</Text>

        <View style={styles.videoContainer}>
          <Text style={styles.adDisclaimer}>ANUNCIO</Text>

          <Video
            ref={video}
            style={{width: "100%", height: "100%"}}
            source={{
              uri: ad?.src,
            }}
            useNativeControls={false}
            resizeMode="cover"
            onLoad={async () => {
              video?.current?.playAsync();
              setLoading(false);
            }}
          />

          <TouchableOpacity
            style={styles.skip}
            onPress={() => {
              if(countdown > 0) return;
              onClose();
            }}
          >
            <Text style={[styles.skipText, {color: countdown == 0 ? colors.primary : colors.black}]}>
              {countdown > 0 ? `Omitir en (${countdown})` : 'OMITIR'}
            </Text>
          </TouchableOpacity>

        </View>
        
        <TouchableOpacity
          onPress={() => {
            if(ad?.CTA?.type == "conocer más") {}
            else if(ad?.CTA?.type == "contactar") {}
            else if(ad?.CTA?.type == "visitar") {
              navigation.navigate("Post", {id: ad?.id});
            }
          }}
        >
          <Text style={styles.button}>{ad?.CTA?.type.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default VideoAd

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: "rgba(0,0,0,0.8)",
    width: "100%",
    height: "101%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  popupContainer: {
    width: "95%",
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'GorditaBold',
    fontSize: vs(13),
    color: "#FFF",
    paddingVertical: vs(8),
  },
  button: {
    fontFamily: 'GorditaBold',
    fontSize: vs(12),
    backgroundColor: "#FFF",
    width: s(110),
    alignSelf: "center",
    textAlign: 'center',
    color: colors.primary,
    borderRadius: 20,
    paddingVertical: vs(2),
    marginVertical: vs(15)
  },
  videoContainer: {
    width: "100%",
    height: vs(170),
    backgroundColor: colors.black,
  },
  adDisclaimer: {
    position: 'absolute',
    top: vs(10),
    left: s(15),
    fontFamily: 'GorditaBlack',
    fontSize: vs(5),
    color: colors.black,
    backgroundColor: "#FFF",
    textAlign: 'center',
    width: s(50),
    height: vs(12),
    paddingTop: vs(2),
    borderRadius: 20,
    opacity: 0.8,
    zIndex: 2,
  },
  skip: {
    position: 'absolute',
    bottom: vs(10),
    right: s(15),
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingVertical: vs(2),
    paddingHorizontal: s(10),
    zIndex: 2
  },
  skipText: {
    fontFamily: 'GorditaBold',
    fontSize: vs(7),
    textAlign: 'center'
  }
})