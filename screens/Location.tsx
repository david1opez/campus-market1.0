import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { useState, useEffect } from 'react'
import { vs, s } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/core';

import { colors, templates } from '../assets/styleVariables'

// COMPONENTS
import Icon from '../assets/icons';
import SelectLocation from '../components/locationScreen/SelectLocation';

// HOOKS
import { GetLocationsData, SetLocation } from '../hooks/GetLocations';

//TYPES
import { LocationScreenProps } from '../types/RootStackParamList';


const Location = () => {
    const navigation = useNavigation<LocationScreenProps>();
    
    const [cities, setCities] = useState<any[]>([]);
    const [schools, setSchools] = useState<{name: string, shortName: string}[]>([]);

    const [city, setCity] = useState('');
    const [school, setSchool] = useState('');
    const [schoolCode, setSchoolCode] = useState('');

    const [showPopup, setShowPopup] = useState(0);

    useEffect(() => {
        if(cities.length > 0) {
            setCity(cities[0]);

            GetLocationsData(cities[0])
            .then(schools => {
                setSchool(schools[0].name)
                setSchoolCode(schools[0].shortName)
                setSchools(schools)
            })
        }
        else {
            GetLocationsData()
            .then(cities => setCities(cities))
        }
    }, [cities])

    return (
        <View style={styles.container}>
            <Icon
                name="logo"
                size={vs(50)}
                color="#FFF"
                style={styles.logo}
            />
            
            <View style={styles.popupContainer}>
                <Text style={styles.title}>ESCOGE TU UBICACIÓN</Text>

                <Text style={styles.placeholder}>Ciudad:</Text>
                <TouchableOpacity style={styles.input}
                    onPress={() => setShowPopup(1)}
                >
                    <Text style={styles.inputText}>{city}</Text>
                </TouchableOpacity>

                <Text style={styles.placeholder}>Escuela:</Text>
                <TouchableOpacity style={styles.input}
                    onPress={() => setShowPopup(2)}
                >
                    <Text style={styles.inputText}>{school}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        if(city == "" || schoolCode == "") return;
                        
                        SetLocation(city.toLowerCase(), schoolCode)
                        .then(() => navigation.navigate('Home'))
                    }}
                >
                    <Text style={styles.buttonText}>ACEPTAR</Text>
                </TouchableOpacity>

                <Text style={styles.footer}>Podrás cambiarla más adelante desde la configuración</Text>
            </View>

            {
                showPopup > 0 && (
                    <SelectLocation
                        onSelect={(option) => {
                            if(showPopup === 1) {
                                setCity(option);
                            } else {
                                setSchool(option.name);
                                setSchoolCode(option.shortName);
                            }

                            setShowPopup(0);
                        }}
                        list={showPopup === 1 ? cities : schools}
                    />
                )
            }

        </View>
    )
}

export default Location

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    logo: {
        position: 'absolute',
        top: vs(20),
        left: s(20),
    },
    popupContainer: {
        width: "90%",
        backgroundColor: "#FFF",
        borderRadius: 10,
        alignItems: "center",
        paddingVertical: vs(20),
        paddingHorizontal: s(25),
        zIndex: 1,
    },
    title: {
        fontSize: vs(17),
        fontFamily: "GorditaBlack",
        color: colors.primary,
        marginBottom: vs(10),
    },
    placeholder: {
        fontSize: vs(8),
        fontFamily: "GorditaMedium",
        color: colors.primary,
        alignSelf: "flex-start",
        marginTop: vs(10),
    },
    input: {
        width: "95%",
        borderBottomWidth: 2,
        borderBottomColor: colors.primary,
    },
    inputText: {
        fontSize: vs(11),
        fontFamily: "GorditaRegular",
        color: "#000",
        paddingLeft: s(2)
    },
    button: {
        borderRadius: 100,
        paddingVertical: vs(3),
        paddingHorizontal: s(30),
        marginTop: vs(25),
        backgroundColor: colors.primary,
    },
    buttonText: {
        fontSize: vs(10),
        fontFamily: 'GorditaBold',
        color: "#FFF",
    },
    footer: {
        fontSize: vs(8),
        fontFamily: "GorditaRegular",
        color: colors.gray,
        marginTop: vs(20),
    },
})