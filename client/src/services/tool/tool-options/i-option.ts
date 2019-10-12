export interface IOption<T> {
    images: Map<T, string>;
    select(): void;
    getImage(): string;
}
