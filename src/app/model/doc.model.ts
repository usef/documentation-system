export interface Doc {
    id: number;
    name: string;
    type: string;
    phase: number;
    details: {
        path?: string;
    };
}