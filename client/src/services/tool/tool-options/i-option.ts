export interface IOption<T> {
    TOOL_TIP: string;
    images: Map<T, string>;
    select(): void;
    getImage(): string;
}
