import firebase from '../firebase';
import { ref, DatabaseReference, get, DataSnapshot, query, orderByChild, equalTo, Query, set, update, limitToFirst, child } from 'firebase/database';
import { Subject, User } from './api';

export interface CreateSubject extends Omit<Subject, 'id'> { }

export class ApplicationDatabase {
    private transformSubjects(response: any): Subject[] {
        if (!response) {
            return [];
        }

        return Object.keys(response).map((key: string) => ({ id: key, ...response[key] })) as Subject[];
    }

    async getAllSubjects(): Promise<any> {
        try {
            const databaseReference: DatabaseReference = ref(firebase.database, 'subjects')

            const snapshot: DataSnapshot = await get(databaseReference);
    
            const response: any = snapshot.val();
    
            return this.transformSubjects(response);
        } catch (err) {
            return [];
        }
    }

    async getSubjectsByType(type: string): Promise<any> {
        try {
            const databaseReference: DatabaseReference = ref(firebase.database, 'subjects')

            const dataQuery: Query = query(databaseReference, orderByChild('type'), equalTo(type));
    
            const snapshot: DataSnapshot = await get(dataQuery);
    
            const response: any = snapshot.val();
    
            return this.transformSubjects(response);
        } catch (err) {
            console.error(err)
            return [];
        }
    }

    async postSubject(subject: CreateSubject, subjectId: string): Promise<Subject> {
        try {
            const databaseReference: DatabaseReference = ref(firebase.database, `subjects/${subjectId}`);

            subject.createAt = new Date();
            
            set(databaseReference, subject);

            return {
                ...subject,
                ...{
                    id: subjectId
                }
            } as Subject;
        } catch (err) {
            console.error('err', err);
            throw err;
        }
    }

    async getSubjectsById(subjectId: string): Promise<Subject> {
        try {
            const databaseReference: DatabaseReference = ref(firebase.database, `subjects/${subjectId}`)
    
            const snapshot: DataSnapshot = await get(databaseReference);
    
            const response: any = snapshot.val();

            if(!response){
                return {} as Subject;
            }
    
            return {
                ...response,
                ...{
                    id: subjectId
                }
            } as Subject;
        } catch (err) {
            console.error(err)
            return {} as Subject;
        }
    }

    async patchSubject(subjectId: string, updateFields: object): Promise<Subject | undefined> {
        try{
            const databaseReference: DatabaseReference = ref(firebase.database, `subjects/${subjectId}`);
            await update(databaseReference, updateFields);
            var subject = await this.getSubjectsById(subjectId);
            return subject as Subject;
        }
        catch(err){
            console.error(err)
        }
    }

    async getUserByCredential(userEmail: string, userProviderId: string): Promise<User | undefined>{
        try {
            const databaseReference: DatabaseReference = ref(firebase.database, `users`);
            const dataQuery: Query = query(databaseReference, orderByChild('email'), equalTo(userEmail), limitToFirst(1));
            const snapshot: DataSnapshot = await get(dataQuery);
            const response: any = snapshot.val();

            if (!response) {
                return;
            }

            const userId: string = Object.keys(response)[0];

            const { email, name, providers } = response[userId];

            if (!providers[userProviderId]) {
                return;
            }

            const user: any = {
                id: userId,
                email,
                name
            };

            return user;
        } catch (err) {
            console.error(err)
            return;
        }
    }
}