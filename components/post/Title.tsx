import { StyleSheet, Text, View } from 'react-native'
import { vs, s } from 'react-native-size-matters';

import { colors } from '../../assets/styleVariables';

// COMPONENTS
import Icon from '../../assets/icons';

// TYPES
import { TitleProps } from '../../types/TitleProps';

const Title = ({title, status, rating, openingHours, verified}: TitleProps) => {
  let stars = [0,0,0,0,0];
  const truncRating = Math.trunc(rating);

  for(let i = 0; i < truncRating; i++) {stars[i] = 1}
  if(rating > truncRating) {stars[truncRating] = (2)}

  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        <Text style={styles.title}>{title}</Text>
        {
            verified && (
                <Icon
                    name="verified"
                    size={vs(15)}
                    color={colors.primary}
                    style={{marginLeft: s(10)}}
                />
            )
        }

        {
            openingHours && openingHours[0] != "" ? (
                <Text style={styles.inactive}>
                    {`${openingHours[0]} - ${openingHours[1]}`}
                </Text>
            ) : (
                <Text style={status ? styles.active : styles.inactive}>
                    {status ? "ACTIVO" : "INACTIVO"}
                </Text>
            )
        }
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
    title: {
        fontFamily: 'GorditaBold',
        fontSize: vs(14),
        lineHeight: vs(20),
        marginLeft: s(15),
        marginRight: s(10),
        marginBottom: vs(7),
        marginTop: vs(6),
        color: colors.black,
        maxWidth: s(250),
    },
    active: {
        fontFamily: "GorditaBold",
        color: "#FFF",
        fontSize: vs(6),
        paddingHorizontal: s(10),
        borderRadius: 100,
        height: vs(13.5),
        paddingTop: vs(2),
        backgroundColor: colors.primary,
        marginRight: s(10),
        marginTop: vs(10),
    },
    inactive: {
        fontFamily: "GorditaBold",
        color: "#FFF",
        fontSize: vs(6),
        paddingHorizontal: s(10),
        borderRadius: 100,
        height: vs(13.5),
        paddingTop: vs(2),
        backgroundColor: colors.gray,
        marginRight: s(10)
    },
})