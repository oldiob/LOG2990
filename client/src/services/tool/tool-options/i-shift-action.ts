/**
 * Using a separate interface because tools other than
 * shapes might use it in the future
 */
export interface IShiftAction {
    onShift(): void;
}
