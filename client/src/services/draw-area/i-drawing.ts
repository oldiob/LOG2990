export interface Drawing {
    id: number;
    name: string;
    thumbnail: SVGElement | null;
    tags: string[];
    svgs: string[];
}
