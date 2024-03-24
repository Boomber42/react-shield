import { initializeApp } from 'firebase/app';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getDatabase, Database } from 'firebase/database';

const firebaseConfig: any = {
    apiKey: process.env.REACT_APP_FIREBASE_apiKey,
    authDomain: process.env.REACT_APP_FIREBASE_authDomain,
    projectId: process.env.REACT_APP_FIREBASE_projectId,
    storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
    messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
    appId: process.env.REACT_APP_FIREBASE_appId,
    measurementId: process.env.REACT_APP_FIREBASE_measurementId
};

const app = initializeApp(firebaseConfig);
const storage: FirebaseStorage = getStorage(app);
const database: Database = getDatabase(app);

interface Firebase {
    storage: FirebaseStorage,
    database: Database,
};

const firebase: Firebase = {
    storage,
    database
};

export default firebase;