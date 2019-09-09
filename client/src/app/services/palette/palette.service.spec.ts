import { ColorPalette } from './palette.service';

describe('Service-ColorPalette', () => {
    const PRIMARY = 0;
    const SECONDARY = 0xFFFFFFFF;
    let mock: ColorPalette = new ColorPalette(PRIMARY, SECONDARY);

    beforeEach(() => {
        mock = new ColorPalette(PRIMARY, SECONDARY);
    });

    it('should construct correctly', () => {
        expect(mock.primary).toEqual(PRIMARY);
        expect(mock.secondary).toEqual(SECONDARY);
    });

    it('should swap correctly', () => {
        mock.swap();
        expect(mock.primary).toEqual(SECONDARY);
        expect(mock.secondary).toEqual(PRIMARY);
    });

    it('should select the correct color', () => {
        const NEW_PRIMARY = 0xdeadbeef;
        const NEW_SECONDARY = 0xafafaf;

        // Expect no side effect on secondary
        mock.selectPrimary(NEW_PRIMARY);
        expect(mock.primary).toEqual(NEW_PRIMARY);
        expect(mock.secondary).toEqual(SECONDARY);

        // Expect no side effect on primary
        mock.selectSecondary(NEW_SECONDARY);
        expect(mock.primary).toEqual(NEW_PRIMARY);
        expect(mock.secondary).toEqual(NEW_SECONDARY);
    });
});
