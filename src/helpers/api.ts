import { ApplicationStorage } from './applicationStorage';
import { v4 as uuidv4 } from 'uuid';
import { ApplicationDatabase, CreateSubject } from './applicationDatabase';
import { ApplicationAuth } from './applicationAuth'

export interface Subject {
    createAt?: Date,
    id: string,
    type: string,
    title: string,
    alt: string,
    codeName?: string,
    image: string,
    name?: string,
    status?: string,
    descripition: string
}

export interface User {
    id: string,
    email: string,
    name: string
}

export default class Api {
    private applicationDatabase: ApplicationDatabase;
    private applicationStorage: ApplicationStorage;
    private applicationAuth: ApplicationAuth;

    constructor() {
        this.applicationDatabase = new ApplicationDatabase();
        this.applicationStorage = new ApplicationStorage();
        this.applicationAuth = new ApplicationAuth();
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

    async patchSubject(id: string, updateFields: object): Promise<Subject | undefined> {
        try{
            return await this.applicationDatabase.patchSubject(id, updateFields);
        }
        catch(err){
            console.error(err)
        }
    }

    async singIn(email: string, password: string): Promise<User | undefined>{
        try {
            const userCredential: any = await this.applicationAuth.signIn(email, password);

            if (!userCredential || !userCredential.user) {
                return;
            }
    
            const user: User | undefined = await this.applicationDatabase.getUserByCredential(email, userCredential.user.uid);
    
            if (!user) {
                return;
            }

            return user;
        } catch (err) {
            console.error('err', err);
            return;
        }
    }
}

