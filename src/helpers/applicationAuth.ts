import firebase from "../firebase";
import { UserCredential, signInWithEmailAndPassword } from 'firebase/auth';

export class ApplicationAuth {
    async signIn(email: string, password: string): Promise<UserCredential | undefined>{
        try{
            var response: UserCredential = await signInWithEmailAndPassword(firebase.auth, email, password);

            if (!response) {
                return;
            }

            return response;
        } catch(error){
            console.error(error)
            return;
        }
    }
}