export interface IOption<T> {
    TIP: string;
    images: Map<T, string>;
    select(): void;
    getImage(): string;
}
