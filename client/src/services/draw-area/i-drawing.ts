export interface Drawing {
    name: string;
    thumbnail: SVGElement | null;
    tags: string[];
    svgs: string[];
    id: number;
}
