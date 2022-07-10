import { getFirestore, getDocs, collection, query, where, limit, startAt, orderBy, doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


const GetPosts = async (category: string, lastDoc?: any): Promise<{posts: any, lastDoc: any}> => {
    let location: any = await AsyncStorage.getItem('@Location');
    if(location) {location = JSON.parse(location)};

    const db = getFirestore();
    const ref = collection(db, "Posts");

    let q;

    if(lastDoc) {
        if(category != "todos") {
            q = query(ref,
              where('location', '==', location),
              where("category", "==", category),
              where("active", "==", true),
              orderBy("title"),
              startAt(lastDoc),
              limit(5),
            );
        } else {
            q = query(ref,
              where('location', '==', location),
              // where("title", "!=", "ELIMINAR"),
              // where("active", "==", true),
              // orderBy("title"),
              // startAt(lastDoc),
              // limit(5)
            );
        }
    } else {
        if(category != "todos") {
            q = query(ref,
              where('location', '==', location),
              where("category", "==", category),
              where("active", "==", true),
              orderBy("title"),
              limit(5),
            );
        } else {
            q = query(ref,
              where('location', '==', location),
              where("active", "==", true),
              orderBy("title"),
              limit(5)
            );
        }
    }

    const documents = await getDocs(q);

    lastDoc = documents.docs[documents.size-1];
    let posts = documents.docs.map(doc => (doc.data()))

    return {posts, lastDoc}
}

const GetPromotedPosts: () => Promise<any[]> = async () => {
  let location: any = await AsyncStorage.getItem('@Location');
  if(location) {location = JSON.parse(location)};

  const db = getFirestore();

  const ref = doc(db, "PromotedPosts", location?.city)

  const docs = await getDoc(ref);

  let posts = docs.data()

  if(!posts) {return []}
  
  return posts[location?.school];
}

export {GetPosts, GetPromotedPosts};