import firebase from "../firebase";
import { User, UserCredential, signInWithEmailAndPassword } from 'firebase/auth';

export class ApplicationAuth {
    async signIn(email: string, password: string): Promise<User | undefined>{
        try{
            var response: UserCredential = await signInWithEmailAndPassword(firebase.auth, email, password);
            console.log('response', response);
            return response.user;
        }
        catch(error){
            console.log(error)
            return;
        }
    }
}