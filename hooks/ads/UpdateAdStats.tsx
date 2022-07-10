import { getFirestore, doc, updateDoc, increment } from 'firebase/firestore'; 

const UpdateAdStats = (id: string, stat: string) => {
    const db = getFirestore();
    const adRef = doc(db, "Ads", id);

    updateDoc(adRef, {
        [stat]: increment(1),
    })
}

export default UpdateAdStats;