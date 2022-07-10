import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, Image, Animated, PanResponder, TouchableOpacity} from 'react-native';
import { vs, s } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

import { colors, templates } from '../../assets/styleVariables';

// COMPONENTS
import Icon from '../../assets/icons';

// HOOKS
import GetAd from '../../hooks/ads/GetAd';

// TYPES
import { HomeScreenProps } from '../../types/RootStackParamList';


const PopupAd = ({user, onClose}: {user: string, onClose: () => void}) => {
  const navigation = useNavigation<HomeScreenProps>();

  const posX = useRef(new Animated.Value(0)).current;
  const posY = useRef(new Animated.Value(0)).current;

  const [ad, setAd] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        posX.setValue(gesture.dx);
        posY.setValue(gesture.dy);
      },
      onPanResponderRelease: (event, gesture) => {
        const X = Math.abs(gesture.dx);

        Animated.spring(posY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();

        if(X >= s(200)) {
          onClose();
        } else {
          Animated.spring(posX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const Y = posY.interpolate({
    inputRange: [vs(-200), 0, vs(200)],
    outputRange: [vs(-30), 0, vs(30)],
    extrapolate: 'clamp',
  });

  const opacity = posX.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [0, 1, 0],
  });

  const GetPopupAd = async () => {
    GetAd("popup").then(data => {
      setLoading(false);
      if (data) {
        setAd(data);
      } else {
        onClose();
      }
    })
  }

  useEffect(() => {
    GetPopupAd();
  }, []);

  if(loading) return null;

  return (
    <Animated.View style={[styles.contentContainer, {opacity}, user!="" && {height: "108%"}]} {...panResponder.panHandlers}>
      <Animated.View
        style={[styles.container, {
          transform: [
            { translateX: posX },
            { translateY: Y },
          ],
        }]}
      >
        <TouchableOpacity onPress={() => onClose()} style={templates.closeIcon}>
          <Icon name="close" size={vs(14)} color={colors.primary} />
        </TouchableOpacity>

        <Text style={styles.adDisclaimer}>ANUNCIO</Text>

        <Image
          style={styles.image}
          source={{uri: ad?.src}}
          resizeMode="cover"
        />

        <Text style={styles.title}>{ad?.title.toUpperCase()}</Text>
        <Text style={styles.description}>{ad?.description}</Text>

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

      </Animated.View>
    </Animated.View>
  )
}

export default PopupAd

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
  adDisclaimer: {
    position: 'absolute',
    top: vs(10),
    left: s(15),
    fontFamily: 'GorditaBlack',
    fontSize: vs(5),
    color: "#FFF",
    backgroundColor: colors.primary,
    textAlign: 'center',
    width: s(50),
    height: vs(12),
    paddingTop: vs(2),
    borderRadius: 20,
    opacity: 0.8,
  },
  title: {
    fontFamily: 'GorditaBlack',
    fontSize: vs(15),
    lineHeight: vs(22),
    color: colors.primary,
    marginTop: vs(5),
    paddingHorizontal: s(15),
    textAlign: 'center',
  },
  description: {
    fontFamily: 'GorditaRegular',
    fontSize: vs(9),
    lineHeight: vs(13),
    color: colors.black,
    marginTop: vs(5),
    marginBottom: vs(25),
    textAlign: 'center',
  },
  image: {
    width: "100%",
    height: vs(170),
    marginVertical: vs(5),
    borderRadius: 10,
  },
  button: {
    fontFamily: 'GorditaBold',
    fontSize: vs(11),
    textAlign: 'center',
    color: "#FFF",
    backgroundColor: colors.primary,
    width: "50%",
    alignSelf: 'center',
    paddingVertical: vs(2),
    borderRadius: 100,
  }
})