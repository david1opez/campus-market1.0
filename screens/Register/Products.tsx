import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import { vs, s } from 'react-native-size-matters'

import { colors, templates } from '../../assets/styleVariables';

// COMPONENTS
import Header from '../../components/register/Header';
import ProgressBar from '../../components/register/ProgressBar';
import Input from '../../components/Input';
import ImageInput from '../../components/register/ImageInput';
import Item from '../../components/register/Item'

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList';
type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;


const Products = ({route}: any) => {
  const navigation = useNavigation<HomeScreenProp>();

  const data = route.params.data;

  const [items, setItems] = useState([]);
  
  return (
    <View style={templates.signInContainer}>

      <Header/>

      <Text style={[templates.signInTitle, {paddingHorizontal: s(20)}]}>REGISTRA TUS PRODUCTOS</Text>

      <View style={styles.formContainer}>
        <View>
          <Text style={styles.placeholder}>Imagen:</Text>
          <ImageInput
            onImagePicked={(value) => {}}
            style={{marginBottom: vs(9)}}
          />
          <Input
            placeholder="Precio:"
            example="$0.00"
            onTextChanged={(value) => {}}
            error=""
            width={s(100)}
            keyboardType="numeric"
            trim={true}
          />
        </View>
        <View>
          <Input
            placeholder="Nombre del producto:"
            onTextChanged={(value) => {}}
            error=""
            width={s(170)}
            style={{marginBottom: vs(10)}}
          />
          <Input
            placeholder="Descripción:"
            onTextChanged={(value) => {}}
            error=""
            width={s(170)}
            multiline={4}
            maxLenght={100}
          />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>AGREGAR</Text>
          </TouchableOpacity>

        </View>
      </View>

      <View style={styles.div}/>

      {
        items.length == 0 && (
          <Text style={styles.emptyText}>Aquí irán apareciendo tus productos</Text>
        )
      }

      <View style={styles.scrollContainer}>
        <ScrollView>
          {
            items.map((item, index) => (
              <Item
                title={item.title}
                description={item.description}
                image={item.image}
                price={item.price}
              />
            ))
          }
        </ScrollView>
      </View>

      <TouchableOpacity
        style={templates.signInButton}
        onPress={() => {
          navigation.navigate("Register_UserDetails", {data: data});
        }}
      >
        <Text style={templates.signInButtonText}>{items.length > 0 ? "SIGUIENTE" : "OMITIR"}</Text>
      </TouchableOpacity>

      <ProgressBar steps={4} currentStep={3} />
    </View>
  )
}

export default Products

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "85%"
  },
  placeholder: {
    fontSize: vs(9),
    lineHeight: vs(16),
    fontFamily: 'GorditaMedium',
    color: colors.darkGray,
    marginBottom: vs(5),
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: vs(2.5),
    borderRadius: 100,
    width: s(90),
    alignSelf: "flex-end",
    marginTop: vs(10)
  },
  buttonText: {
    fontSize: vs(9),
    lineHeight: vs(15),
    fontFamily: "GorditaBold",
    color: "#FFF",
    textAlign: "center",
  },
  emptyText: {
    fontSize: vs(9),
    lineHeight: vs(15),
    fontFamily: "GorditaMedium",
    color: colors.gray,
  },
  div: {
    width: "90%",
    height: 1,
    backgroundColor: colors.lightGray,
    marginVertical: vs(10)
  },
  scrollContainer: {
    width: "100%",
    height: s(200),
  },
})