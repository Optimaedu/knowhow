type Challenge = {
    id: number;
    title: string;
    description: string;
    level: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
    boilerplate: string | null;
}