import { getFirestore, collection, getDocs, getDoc, doc} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetLocationsData: (city?: string) => Promise<any[]> = async (city) => {
    const db = getFirestore();

    if(!city) {
        let docs = await getDocs(collection(db, "Locations"));
        let cities = docs.docs.map(doc => (doc.id));
        return cities

    } else {
        let docSnap = await getDoc(doc(db, "Locations", city));
        let schools = docSnap?.data()?.schools;
        return schools
    }

}

const SetLocation = async (city: string, school: string) => {
    if(city !== '' && school !== '') {
        await AsyncStorage.setItem('@Location', JSON.stringify({ city, school }));
    }
}

export {GetLocationsData, SetLocation};
