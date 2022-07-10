import { getFirestore, getDoc, doc } from 'firebase/firestore';

type Post = any;

const GetPromotedPosts: (id: string) => Promise<Post | undefined> = async (id) => {
    const db = getFirestore();

    let docSnap = await getDoc(doc(db, "Posts", id));

    if(!docSnap.exists()) return;

    let data = docSnap.data();
    return data;
}

export default GetPromotedPosts;