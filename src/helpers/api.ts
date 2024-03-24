import { ApplicationStorage } from '../helpers/applicationStorage';
import { v4 as uuidv4 } from 'uuid';

import { ApplicationDatabase, CreateSubject } from '../helpers/applicationDatabase';

export interface Subject {
    id: string,
    type: string,
    title: string,
    alt: string,
    codeName?: string,
    image: string,
    name?: string,
    status?: string
}

export default class Api {
    private applicationDatabase: ApplicationDatabase;
    private applicationStorage: ApplicationStorage;

    constructor() {
        this.applicationDatabase = new ApplicationDatabase();
        this.applicationStorage = new ApplicationStorage();
    }

    async getSubjectsByType(type: string): Promise<Subject[]> {
        try {
            return await this.applicationDatabase.getSubjectsByType(type);
        } catch (error) {
            return [];
        }
    }

    async postSubject(subject: Subject): Promise<Subject> {
        try {
            const subjectId: string = uuidv4();

            let urlImage: string | undefined = await this.applicationStorage.upload(subject.image, `${subjectId}.jpg`);

            const uploadSubject: CreateSubject = subject;

            uploadSubject.image = urlImage ?? uploadSubject.image;

            return await this.applicationDatabase.postSubject(uploadSubject, subjectId);
        } catch (error) {
            return {} as Subject;
        }
    }

    async getSubjectById(id: string): Promise<Subject> {
        try {
            return await this.applicationDatabase.getSubjectsById(id);
        } catch(error){
            return {} as Subject;
        }
    }
}

