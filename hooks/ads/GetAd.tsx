import { getFirestore, getDocs, collection, query, limit, where } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


const GetRandomIndex = (limit: number) => {
    return Math.floor(Math.random() * limit+1);
}

const GetAd = async (type: "banner"|"video"|"popup") => {
    let location = await AsyncStorage.getItem('@Location');
    if(location) {location = JSON.parse(location)};

    const db = getFirestore();
    const adRef = collection(db, "Ads");

    const q = query(adRef,
        where('location', '==', location),
        where("active", "==", true),
        where("type", "==", type),
        limit(10),
    );

    const docs = getDocs(q);

    if ((await docs).size === 0) return null;

    return (await docs.then(snap => {
        const index = GetRandomIndex(snap.size);
        const data = snap.docs[index].data();
        
        return {
            src: data.src || "",
            title: data.title || "",
            description: data.description || "",
            id: snap.docs[index].id,
            CTA: {
                type: data.CTA?.type || "",
                link: data.CTA?.link || "",
            },
        }
    }))

}

export default GetAd;