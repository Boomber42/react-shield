export interface Subject{
    type: string,
    title: string,
    alt: string,
    codeName?: string,
    image: string,
    name?: string,
    status?: string
}

export default class Api{
    async getSubjects(type: string): Promise<Subject[]> {
        let response = await fetch('http://localhost:4000/subjects');
        var subjects: Subject[] = await response.json();
        var filteredItems: Subject[] = subjects.filter((element: Subject) => element.type === type);
        return filteredItems
    }
}

