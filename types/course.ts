interface LearningPoint {
    point: string;
}

interface Lecture {
    name: string;
}

interface Module {
    moduleName: string;
    tags: string[];
    lectures: Lecture[];
}

interface Link {
    key : string;
    url: string;
}

export interface Course {
    id: string;
    image: string;
    name: string;
    description: string;
    username: string;
    startDate: string;
    endDate: string;
    language: string;
    price: number;
    learningPoints: LearningPoint[];
    modules: Module[];
    links: Link[];
}



export interface CourseFormData {
    id?: string;
    image: string;
    name: string;
    description: string;
    username: string;
    startDate: string;
    endDate: string;
    language: string;
    price: number;
    learningPoints: LearningPoint[];
    modules: Module[];
    links: Link[];
    imageUrl?: string;
}

export interface CourseFormDataRecived {
    id?: string;
    imageUrl?: string;
    name: string;
    description: string;
    username: string;
    startDate: string;
    endDate: string;
    language: string;
    price: number;
    learningPoints: LearningPoint[];
    modules: Module[];
    links: Link[];
}