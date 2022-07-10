import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import { vs, s } from 'react-native-size-matters'

import { colors, templates } from '../../assets/styleVariables';

// COMPONENTS
import Header from '../../components/register/Header';
import ProgressBar from '../../components/register/ProgressBar';
import Input from '../../components/Input';
import Category from '../../components/home/Category';
import ImageInput from '../../components/register/ImageInput';

// TYPES
import { StoreDetailsScreenProps } from '../../types/RootStackParamList';
import { CategoryType } from '../../types/HomeScreen';


const StoreDetails = ({route} : any) => {
  const navigation = useNavigation<StoreDetailsScreenProps>();

  const userType = route.params.userType;

  const categories: CategoryType[] = ["TODOS", "COMIDA", "REGALOS", "ROPA", "CUIDADO PERSONAL", "OTROS"];

  const [activeCategory, setActiveCategory] = useState<CategoryType>('TODOS');
  const [activeOption, setActiveOption] = useState(' SI ');

  const [images, setImages] = useState<Blob[]>([]);

  const [openingHour, setOpeningHour] = useState('');
  const [closingHour, setClosingHour] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [allFilled, setAllFilled] = useState(false);

  const updateImagesArray = (image: Blob, index: number) => {
    let newImages = images;
    newImages[index] = image;
    setImages(newImages);
  }

  useEffect(() => {
    if(title && description && images) {
      if(userType == 'business') {
        if(openingHour && closingHour) setAllFilled(true);
        else setAllFilled(false);
      } else setAllFilled(true);
    } else setAllFilled(false);
  }, [images, openingHour, closingHour, title, description]);
  
  return (
    <View style={templates.signInContainer}>
      <Header/>

      <Text style={templates.signInTitle}>CUENTANOS UN POCO SOBRE TÚ NEGOCIO</Text>

      <View style={styles.verticalScrollContainer}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Input
          placeholder="Nombre del negocio:"
          autoCapitalize="words"
          error=""
          trim={false}
          onTextChanged={(value) => setTitle(value)}
        />

        <Input
          placeholder="Descripción:"
          autoCapitalize="sentences"
          error=""
          trim={false}
          multiline={5}
          maxLenght={350}
          onTextChanged={(value) => setDescription(value)}
        />

        <View style={styles.scrollContainer}>
          <Text style={styles.placeholder}>Categoría:</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {
              categories.map((category, index) => (
                <Category
                  key={index}
                  name={category}
                  activeCategory={activeCategory}
                  onPress={() => setActiveCategory(category)}
                />
              ))
            }
          </ScrollView>
        </View>

        {
          userType == "business" && (
            <View style={styles.openingHours}>
              <Text style={styles.placeholder}>Horario de apertura:</Text>
              <View style={styles.inputsContainer}>
                <Input
                  placeholder=""
                  example="00:00 a.m."
                  autoCapitalize="words"
                  error=""
                  trim={true}
                  width={s(90)}
                  style={[styles.input, {marginRight: s(20)}]}
                  onTextChanged={(text) => setOpeningHour(text)}
                />
                <Input
                  placeholder=""
                  example="00:00 p.m."
                  autoCapitalize="words"
                  error=""
                  trim={true}
                  width={s(90)}
                  style={styles.input}
                  onTextChanged={(text) => setClosingHour(text)}
                  keyboardType=""
                />
              </View>
            </View>
          )
        }

        <View style={styles.scrollContainer}>
          <Text style={styles.placeholder}>¿Ofreces más de un producto?</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
              <Category
                name=" SI "
                activeCategory={activeOption}
                onPress={() => setActiveOption(' SI ')}
              />
              <Category
                name="NO"
                activeCategory={activeOption}
                onPress={() => setActiveOption('NO')}
              />
          </ScrollView>
        </View>

        <Text style={styles.placeholder}>Imágenes:</Text>
        <View style={styles.imageContainer}>
          <ImageInput onImagePicked={(image) => {if(image) updateImagesArray(image, 0)}}/>
          <ImageInput onImagePicked={(image) => {if(image) updateImagesArray(image, 1)}}/>
          <ImageInput onImagePicked={(image) => {if(image) updateImagesArray(image, 2)}}/>
        </View>

      </ScrollView>
      </View>

      <TouchableOpacity
        style={[templates.signInButton, !allFilled && {backgroundColor: colors.gray}]}
        onPress={() => {
          if(!allFilled) return;
          if(activeOption == ' SI ') navigation.navigate('Register_Products', {data: {
            title, description,
            category: activeCategory,
            openingHours: [openingHour, closingHour],
          }});
          else navigation.navigate("Register_UserDetails", {data: {
            title, description,
            category: activeCategory,
            openingHours: [openingHour, closingHour],
          }});
        }}
      >
        <Text style={templates.signInButtonText}>SIGUIENTE</Text>
      </TouchableOpacity>

      <ProgressBar steps={activeOption == "NO" ? 3 : 4} currentStep={2} />
    </View>
  )
}

export default StoreDetails

const styles = StyleSheet.create({
  verticalScrollContainer: {
    height: vs(390),
  },
  scrollView: {
    alignItems: 'center',
    paddingBottom: vs(40),
  },
  scrollContainer: {
    height: vs(40),
    marginBottom: vs(7),
    width: '100%',
  },
  categoriesContainer: {
    paddingLeft: s(40),
  },
  placeholder: {
    fontSize: vs(9),
    lineHeight: vs(16),
    fontFamily: 'GorditaMedium',
    color: colors.darkGray,
    alignSelf: 'flex-start',
    marginBottom: vs(5),
    paddingLeft: s(45),
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: vs(10),
    marginTop: vs(5),
  },
  openingHours: {
    width: '100%',
    marginVertical: vs(5)
  },
  inputsContainer: {
    flexDirection: 'row',
    marginHorizontal: s(45),
  },
  input: {
    fontSize: vs(11),
    lineHeight: vs(20),
    fontFamily: 'GorditaMedium',
  }
})