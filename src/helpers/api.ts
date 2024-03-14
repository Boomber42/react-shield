export interface Subject{
    id?: string, 
    type: string,
    title: string,
    alt: string,
    codeName?: string,
    image: string,
    name?: string,
    status?: string
}

const mockSubjects: Subject[] = [
    {
        "id": "1",
        "type": "Agente",
        "title": "Agente Coulson",
        "alt": "imagem do Coulson",
        "codeName": "Phill.",
        "image": "/assets/images/coulson.jpg",
        "name": "Phillip J. Coulson.",
        "status": "Morto."
    },
    {
        "id": "2",
        "type": "Agente",
        "title": "Agente May",
        "alt": "imagem da Melinda",
        "codeName": "Cavalaria.",
        "image": "/assets/images/melinda.jpg",
        "name": "Melinda May.",
        "status": "Viva."
    },
    {
        "id": "3",
        "type": "Vingador",
        "title": "Capitão America",
        "alt": "imagem do Capitão America",
        "codeName": "Capitão America.",
        "image": "/assets/images/cap.jpg",
        "name": "Steven Grant Rogers.",
        "status": "Desaparecido."
    },
    {
        "id": "4",
        "type": "Vingador",
        "title": "Homem de Ferro",
        "alt": "imagem do Homem de Ferro",
        "codeName": "Homem de Ferro.",
        "image": "/assets/images/iron man.jpg",
        "name": "Antony Edward Stark.",
        "status": "Morto."
    },
    {
        "id": "5",
        "type": "Objeto",
        "title": "Tesseract",
        "alt": "imagem do Tesseract",
        "image": "/assets/images/tesseract.jpg"
    },
    {
        "id": "6",
        "type": "Objeto",
        "title": "Monolito",
        "alt": "imagem do Monolito",
        "image": "/assets/images/Monolito.png"
    },
    {
        "id": "7",
        "type": "Veiculo",
        "title": "Lola",
        "alt": "imagem do Lola",
        "image": "/assets/images/lola.jpg"
    },
    {
        "id": "8",
        "type": "Veiculo",
        "title": "Quinjet",
        "alt": "imagem do Quinjet",
        "image": "/assets/images/quinjet.jpg"
    }
]

export default class Api{
    async getSubjectsByType(type: string): Promise<Subject[]> {
        var filteredItems: Subject[];

        try{
            let response = await fetch('http://localhost:4000/subjects');
            var subjects: Subject[] = await response.json();
            filteredItems = subjects.filter((element: Subject) => element.type === type);
            return filteredItems
        }catch(error){
            filteredItems = mockSubjects.filter((element: Subject) => element.type === type);
            return filteredItems
        }
    }

    async postSubject(subject: Subject): Promise<Subject> {
        try{
            const options: any = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subject),
            };

            let response = await fetch('http://localhost:4000/subjects', options);
            var result: Subject = await response.json();
            mockSubjects.push(result);
            return result;
        } catch(error){
            var newSubject = subject;
            newSubject.id = String(Math.floor(Math.random() * 91) + 10);
            mockSubjects.push(newSubject);
            return newSubject;
        }
    }
}

