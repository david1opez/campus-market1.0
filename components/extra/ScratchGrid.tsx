import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { vs, s } from 'react-native-size-matters';

import {colors } from '../../assets/styleVariables';

const ScratchGrid = ({onSelect}: {onSelect: (discount: number) => void}) => {
  const [scratchedIndex, setScratchedIndex] = useState('');

  const [couponsArray, setCouponsArray] = useState([[0,0,0],[0,0,0]]);

  useEffect(() => {
    const options = [
      2,0,2,0,2,0,0,2,0,5,
      2,0,5,0,5,10,0,5,0,2,
      7,0,0,3,2,0,8,0,0,2,
      2,0,2,0,0,4,0,2,0,2,
      3,0,10,0,2,0,2,0,6,2,
    ]

    const coupons = couponsArray.map(row => row.map(col => options[Math.floor(Math.random() * options.length)]));
    setCouponsArray(coupons);
  }, [])

  return (
    <View style={styles.grid}>
        {
            couponsArray.map((row, rowIndex) => (
                <View style={styles.gridRow} key={rowIndex}>
                {
                    couponsArray[0].map((price, index) => (
                        <TouchableOpacity key={index}
                            style={styles.gridCell}
                            activeOpacity={1}
                            onPress={() => {
                                if(!scratchedIndex) {
                                    setScratchedIndex(`${rowIndex}${index}`);
                                    onSelect(price);
                                }
                            }}
                        >
                            {
                                scratchedIndex != `${rowIndex}${index}` && (
                                    <View style={styles.cover}>
                                        <Text style={styles.questionMark}>?</Text>
                                    </View>
                                )
                            }
                            <Text style={styles.gridCellText}>${price}.00</Text>
                        </TouchableOpacity>
                    ))
                }
                </View>
            ))
        }
    </View>
  )
}

export default ScratchGrid

const styles = StyleSheet.create({
    grid: {
      marginHorizontal: s(10),
      marginTop: vs(15),
    },
    gridRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: vs(10),
    },
    gridCell: {
      backgroundColor: '#FFF',
      width: vs(70),
      height: vs(70),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      borderWidth: 2,
      borderColor: colors.primary,
    },
    gridCellText: {
      fontFamily: 'GorditaBold',
      fontSize: s(15),
      color: colors.primary,
    },
    cover: {
      position: 'absolute',
      backgroundColor: colors.primary,
      width: vs(70),
      height: vs(70),
      zIndex: 1,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    questionMark: {
      fontFamily: 'GorditaBold',
      fontSize: s(30),
      color: '#FFF',
    },
})