export interface IOption<T> {
    readonly tip: string;
    images: Map<T, string>;
    select(): void;
    getImage(): string;
}
