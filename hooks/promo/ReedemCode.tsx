import { getFirestore, getDoc, doc, updateDoc } from 'firebase/firestore';

const ReedemCode = async (code: string, uid: string) => {
    const db = getFirestore();
    
    if(code.includes("//") || code.includes(".")) {
        return 0;
    }
    
    const ref = doc(db, "PromoCodes", code);

    let docSnap = await getDoc(ref);

    if(!docSnap.exists()) {return 0};
    if(docSnap.data().reedemed) {return 1};

    if(uid) {
        await updateDoc(ref, {
            reedemed: true,
            seller: uid
        })
    }

    return docSnap.data().discount;
}

export default ReedemCode