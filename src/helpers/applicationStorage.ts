import firebase from '../firebase';
import { ref, uploadString } from 'firebase/storage';

const BASE_URL: string = 'https://firebasestorage.googleapis.com/v0/b/react-shield.appspot.com/o';

export class ApplicationStorage {
    async upload(base64Image: string, fileName: string) {
        const storageRef = ref(firebase.storage, fileName);
        await uploadString(storageRef, base64Image, 'data_url');
        return `${BASE_URL}/${fileName}?alt=media&token=de0c6456-9579-41d3-b86b-5d4a5b718b58`;
    }
}