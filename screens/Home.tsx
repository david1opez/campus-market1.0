import { StyleSheet, View, Animated, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { vs, s } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../assets/styleVariables';
import { getAuth } from 'firebase/auth';
import { getFirestore, getDoc, doc } from 'firebase/firestore';

// COMPONENTS
import Header from '../components/Header';
import PromotedPost from '../components/home/PromotedPost';import StudentPost from '../components/home/StudentPost';
import BusinessPost from '../components/home/BusinessPost';
import SearchBar from '../components/home/SearchBar';import Category from '../components/home/Category';
import LoadingPromotedPost from '../components/home/LoadingPromotedPost';
import BannerAd from '../components/ads/BannerAd'; import VideoAd from '../components/ads/VideoAd'; import PopupAd from '../components/ads/PopupAd';
import NoPostsComponent from '../components/home/NoPostsComponent';
import ScratchCoupon from '../components/extra/ScratchCoupon';

// HOOKS
import {GetPosts, GetPromotedPosts} from '../hooks/GetPosts';
import { AreThereCodesLeft } from '../hooks/promo/GetCode';

// TYPES
import { CategoryType, PostType, PromotedPostType } from '../types/HomeScreen';
import { HomeScreenProps } from '../types/RootStackParamList';

const Home = () => {
  const db = getFirestore();
  const auth = getAuth();
  const uid = auth.currentUser?.uid;

  const navigation = useNavigation<HomeScreenProps>();

  const [showCoupon, setShowCoupon] = useState(false);

  const [settingsPopup, setSettingsPopup] = useState(false);

  const [activeCategory, setActiveCategory] = useState<CategoryType>('todos');
  const [user, setUser] = useState<any>();

  const [promotedPosts, setPromotedPosts] = useState<PromotedPostType[]>([]);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [lastDoc, setLastDoc] = useState(undefined);

  const [isSearching, setIsSearching] = useState(false);

  const [postsLoading, setPostsLoading] = useState(true);
  const [bottomReached, setBottomReached] = useState(false);

  const [showAd, setShowAd] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  const categories: CategoryType[] = ["todos", "comida", "regalos", "ropa", "cuidado personal", "otros"];

  const Search = async (value: string) => {}

  const GetUserInfo = async () => {
    if(uid) {
      const ref = doc(db, "Users", uid);
      const userInfo = await getDoc(ref);

      if(userInfo.exists()) {
        const data = userInfo.data();
        setUser(data);
      }
    } else {
      setUser({id: "", type: "none", showAds: true});
    }
  }

  const ChooseAd = () => {
    const random = Math.floor(Math.random() * 3) + 1;
    setShowAd(random);
  }

  const LoadPosts = async (option?: 'reload'|'loadMore'|undefined) => {
    setPostsLoading(true);

    if(option == 'reload' || !option) {
      GetPromotedPosts()
      .then((posts) => setPromotedPosts(posts))
      .catch(err => {
        console.log(err);
      })

      ChooseAd();
    }

    if(option == 'reload') {
      setPosts([]);
      setLastDoc(undefined);
    }

    GetPosts(activeCategory, lastDoc)
    .then((data) => {
      if(data.posts.length > 0) {
        setPosts(data.posts);
        setLastDoc(data.lastDoc)
      }
      else if('loadMore') {setBottomReached(true)}
      else {setPosts([]); setLastDoc(undefined)}

      setPostsLoading(false);
    })
    .catch((err) => {
      console.log(err)
      setPostsLoading(false);
    });
  }

  useEffect(() => {      
      ChooseAd();
      LoadPosts();
      GetUserInfo();

      AreThereCodesLeft().then(state => {
        if(state) {
          AsyncStorage.getItem('@code').then(value => {
            if(!value) setShowCoupon(true)
          }).catch(err => {console.log(err)});
        }
      });
  }, []);


  return (
    <View style={{flex: 1}}>
      <Header
        type="transparent"
        userType={user?.type}
        onReload={() => LoadPosts('reload')}
        onSettings={() => setSettingsPopup(!settingsPopup)}
      />

      {
        settingsPopup && (
          <View style={styles.settingsContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Location")}
            >
              <Text style={styles.settingsButtonText}>Cambiar Ubicación</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Location")}
            >
              <Text style={styles.settingsButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        )
      }

      {/* PROMOTED POSTS */}
      {
        posts.length == 0 && !postsLoading ? (
          <NoPostsComponent />
        ) :
        promotedPosts?.length > 0 && !postsLoading && !isSearching && (
          <Animated.FlatList
            data={promotedPosts}
            keyExtractor={(_, index) => (index.toString())}
            renderItem={({item, index}: {item: PromotedPostType, index: number}) => {
              const inputRange: number[] = [
                (index - 1) * s(280),
                index * s(280),
                (index + 1) * s(280),
              ];

              const scrollY = scrollX.interpolate({
                inputRange,
                outputRange: [0, -35, 0],
              });
              
              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.8, 1, 0.8],
              });

              if(item.active == null) {
                return(
                  <LoadingPromotedPost
                    key={index}
                    scale={scale}
                    scrollY={scrollY}
                  />
                )
              }

              return (
                <PromotedPost
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  id={item.id}
                  active={item.active}
                  scrollY={scrollY}
                  scale={scale}
                  key={index}
                />
              );
            }}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true}
            )}
            contentContainerStyle={styles.promotedPostsFlatList}
            snapToInterval={s(279)}
            decelerationRate={0.8}
            scrollEventThrottle={16}
            initialScrollIndex={1.04}
            onScrollToIndexFailed={() => {}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            snapToAlignment="center"
          />
        )
      }

      {
        posts && posts.length > 0 && promotedPosts?.length > 0 && (
          <Text style={styles.promotedPostsTitle}>PUBLICACIONES PROMOCIONADAS</Text>
        )
      }

      {/* SEARCHBAR */}
      <SearchBar
        searchValue={(value) => {Search(value)}}
        onFocus={() => {
          setIsSearching(true);
        }}
        onBlur={() => {
          setIsSearching(false);
        }}
      />

      {/* CATEGORIES */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {
          categories.map((category: CategoryType, index: number) => (
            <Category
              key={index}
              name={category}
              activeCategory={activeCategory}
              onPress={() => setActiveCategory(category)}
            />
          ))
        }
      </ScrollView>

      {/* POSTS */}
      <Animated.FlatList
        style={[
          styles.postsContainer,
          isSearching && {height: vs(180)},
          posts.length == 0 && !postsLoading && {height: vs(170)}
        ]}
        data={posts}
        keyExtractor={item => item?.id}
        renderItem={({item, index}: {item: any, index: number}) => {
          if(!item) return null;

          if(item.type == "student") {
            return (
              <StudentPost
                title={item?.title}
                description={item?.description}
                image={item?.previewImage}
                active={item?.status}
                id={item?.id}
                key={index}
              />
            )
          }

          return (
            <BusinessPost
              title={item?.title}
              description={item?.description}
              image={item?.previewImage}
              openingHours={item?.openingHours}
              verified={item?.verified}
              id={item?.id}
              key={index}
            />
          );
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true}
        )}
        contentContainerStyle={[
          styles.postsFlatList,
          isSearching && {paddingTop: vs(10)}
        ]}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onEndReached={async () => {
          if(postsLoading) return;
          await LoadPosts();
        }}
        onEndReachedThreshold={0}
        ListFooterComponent={() => {
          if(bottomReached || posts?.length <= 5) return null;

          return (
            <ActivityIndicator
              size="large"
              color={colors.primary}
              style={{marginBottom: vs(20)}}
            />
          )
          
        }}
      />
      
      {/* ADS */}
      {
        user?.showAds && showAd != 0 && (
          showAd == 1 ? (
            <BannerAd onClose={() => setShowAd(0)}/>
          ) :
          showAd == 2 ? (
            <PopupAd user={user.type} onClose={() => setShowAd(0)}/>
          ) : (
            <VideoAd user={user.type} onClose={() => setShowAd(0)}/>
          )
        )
      }

      {/* SCRATCH */}
      {
        showCoupon && posts && posts.length > 0 && (
          <ScratchCoupon
            onClose={() => {setShowCoupon(false)}}
            user={user.type}
          />
        )
      }

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  promotedPostsTitle: {
    fontFamily: 'GorditaBold',
    fontSize: s(9),
    textAlign: 'center',
    opacity: 0.3,
    marginTop: vs(-15)
  },
  categoriesContainer: {
    marginTop: vs(15),
    paddingLeft: s(10),
  },
  postsContainer: {
    height: vs(330),
    flexGrow: 0,
  },
  promotedPostsFlatList: {
    paddingTop: vs(30),
    paddingHorizontal: s(55)
  },
  postsFlatList: {
    alignItems: 'center',
    paddingTop: vs(20),
  },
  settingsContainer: {
    position: 'absolute',
    backgroundColor: colors.primary,
    paddingHorizontal: s(20),
    paddingVertical: vs(2),
    borderRadius: 5,
    top: vs(70),
    right: s(20),
    zIndex: 1,
  },
  settingsButtonText: {
    fontFamily: 'GorditaMedium',
    fontSize: vs(10),
    paddingVertical: vs(4),
    paddingRight: s(10),
    color: "#FFF",
  },
})