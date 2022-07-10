import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { vs, s } from 'react-native-size-matters';

import { colors } from '../assets/styleVariables';

// COMPONENTS
import Header from '../components/Header';
import Gallery from '../components/post/Gallery';
import Title from '../components/post/Title';
import Product from '../components/post/Product';
import ProductsCards from '../components/post/ProductsCards';

// HOOKS
import GetPostInfo from '../hooks/GetPostInfo';

// TYPES
import { PostScreenProps } from '../types/RootStackParamList';

const Post = ({route}: any) => {
  const navigation = useNavigation<PostScreenProps>();

  const [returning, setReturning] = useState<boolean>(false);
  const [scrollToBeggining, setScrollToBeggining] = useState<boolean>(false);
  const [showCards, setShowCards] = useState<number>(-1);

  const [post, setPost] = useState<any>({});
  const [productsGridArray, setProductsGridArray] = useState<any[]>([]);

  const id = route.params.id;
  const images = route.params.images;

  useEffect(() => {
    GetPostInfo(id).then(post => {
      if(!post) {navigation.goBack(); return}
      setPost(post);
    })
    .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    if(!post.products) return;

    const grid = post?.products?.reduce((acc: any, curr: any, index: number) => {
      if (index % 2 === 0) {
          acc.push([curr]);
      } else {
          acc[acc.length - 1].push(curr);
      }
      return acc;
    }, []);
    
    setProductsGridArray(grid);
  }, [post])
  
  return (
    <View style={{height: '103%'}}>
      <Header
        type="green"
        onReturn={() => {
          setReturning(true);
          if(scrollToBeggining) {
            setTimeout(() => {
              navigation.goBack();
            }, 500)
          }
          else {
            navigation.goBack();
          }
        }}
      />

      <ScrollView style={{top: vs(-18), zIndex: -1}}>
        {/* IMAGES SLIDER */}
        <Gallery
          images={post.images}
          returning={returning}
          scrollToBeggining={(scrollToBeggining: boolean) => setScrollToBeggining(scrollToBeggining)}
        />

        {/* TITLE, RATING & STATUS */}
        <Title
          title={post.title}
          status={post.status == "open" ? true : false}
          rating={0}
          openingHours={post?.openingHours}
          verified={post.verified}
        />

        {/* DESCRIPTION */}
        <Text style={styles.description}>{post.description}</Text>

        {/* PRODUCTS*/}
        <View style={{marginBottom: vs(100)}}>
          {
            productsGridArray.length > 0 && (
            productsGridArray?.map((products: any, index: number) => (
              <View key={index} style={styles.grid}>
                <Product
                  product={products[0]}
                  index={index}
                  onSelect={(id: number) => {setShowCards(id)}}
                />
                {
                  products[1] && (
                    <Product
                      product={products[1]}
                      index={index}
                      onSelect={(id: number) => {setShowCards(id+1)}}
                    />
                  )
                }
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* PRODUCT CARDS */}
      {
        showCards != -1 && (
          <ProductsCards
            product={post.products[showCards]}
            onClose={() => {setShowCards(-1)}}
          />
        )
      }

      {/* CONTACT BUTTON */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{backgroundColor: colors.primary, borderRadius: 100}}
        >
          <Text style={styles.buttonText}>CONTACTAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
  description: {
    fontFamily: 'GorditaLight',
    fontSize: vs(9),
    lineHeight: vs(12),
    marginHorizontal: s(15),
    marginTop: vs(10),
    marginBottom: vs(25),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: vs(80),
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'GorditaBold',
    fontSize: vs(13),
    color: "#FFF",
    paddingVertical: vs(5),
    textAlign: 'center',
    paddingHorizontal: s(40)
  },
  grid: {
    flexDirection: 'row',
    marginHorizontal: s(25),
    marginBottom: vs(5),
    justifyContent: 'space-between',
  }
})