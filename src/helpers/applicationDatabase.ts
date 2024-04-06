import firebase from '../firebase';
import { ref, DatabaseReference, get, DataSnapshot, query, orderByChild, equalTo, Query, set, update, limitToFirst, child } from 'firebase/database';
import { Subject } from './api';

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
            console.log(err)
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
            console.log('err', err);
            return { } as Subject;
        }
    }

    async getSubjectsById(subjectId: string): Promise<Subject> {
        try {
            const databaseReference: DatabaseReference = ref(firebase.database, `subjects/${subjectId}`)
    
            const snapshot: DataSnapshot = await get(databaseReference);
    
            const response: any = snapshot.val();
    
            return {
                ...response,
                ...{
                    id: subjectId
                }
            } as Subject;
        } catch (err) {
            console.log(err)
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
            console.log(err)
        }
    }

    async getUserByProviderId(userProviderId: string): Promise<any>{
        try {
            const databaseReference: DatabaseReference = ref(firebase.database, `users`);

            // const dataQuery: Query = query(databaseReference, child(`providers/${userProviderId}`), equalTo(true), limitToFirst(1));
            const dataQuery = child(databaseReference, `providers`);
            const dataQuery1 = child(dataQuery, `${userProviderId}`);
            const dataQuery2 = child(dataQuery1, `true`);
            const snapshot: DataSnapshot = await get(dataQuery2);
            console.log('snapshot', snapshot);
            const response: any = snapshot.val();
    
            return {
                ...response,
                ...{
                    id: userProviderId
                }
            } as Subject;

        } catch (err) {
            console.log(err)
            return {};
        }
    }
}