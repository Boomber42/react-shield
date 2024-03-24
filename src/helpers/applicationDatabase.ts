import firebase from '../firebase';
import { ref, DatabaseReference, get, DataSnapshot, query, orderByChild, equalTo, Query, set } from 'firebase/database';

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
}