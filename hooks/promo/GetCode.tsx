import { getFirestore, getDocs, collection, query, where, limit, doc, updateDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetCode = async (discount: number): Promise<String | null> => {
    const db = getFirestore();
    const ref = collection(db, "PromoCodes");

    let q = query(ref,
        where("taken", "==", false),
        limit(1)
    );

    const rawDocs = getDocs(q);

    const docs = await rawDocs.then(snap => {
        return snap.docs.map(doc => {
            return doc.id;
        });
    });

    const id = docs[0];

    return UpdateCode(id, discount)
    .then(() => {
        return StoreCode(id).then(() => {
            return id;
        })
        .catch(err => {
            console.log(err);
            return null;
        }
    )})
    .catch(err => {
        console.log(err.message);
        return null
    })
}

const UpdateCode = async (id: string, discount: number) => {
    const db = getFirestore();
    const ref = doc(db, "PromoCodes", id)

    await updateDoc(ref, {
        taken: true,
        discount: discount,
    })
}

const AreThereCodesLeft = async (): Promise<boolean> => {
    const db = getFirestore();
    const ref = collection(db, "PromoCodes");

    let q = query(ref,
        where("taken", "==", false),
        limit(1)
    );

    const rawDocs = getDocs(q);

    const docs = await rawDocs.then(snap => {
        return snap.docs.map(doc => {
            return doc.id;
        });
    });

    return docs.length > 0;
}

const StoreCode = async (id: string) => {
    try {
      await AsyncStorage.setItem('@code', id)
    } catch (err) {
        console.log(err)
    }
}

export {GetCode, AreThereCodesLeft};