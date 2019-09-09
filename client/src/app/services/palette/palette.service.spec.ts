import { ColorPalette } from './palette.service';

describe('Service-ColorPalette', () => {
    const primary : number = 0;
    const secondary : number = 0xFFFFFFFF;
    var mock : ColorPalette = new ColorPalette(primary, secondary);

    beforeEach(() => {
	mock = new ColorPalette(primary, secondary);
    });

    it('should construct correctly', () => {
	expect(mock.primary).toEqual(primary);
	expect(mock.secondary).toEqual(secondary);
    });

    it('should swap correctly', () => {
	mock.swap();
	expect(mock.primary).toEqual(secondary);
	expect(mock.secondary).toEqual(primary);
    });

    it('should select the correct color', () => {
	const new_primary : number = 0xdeadbeef;
	const new_secondary : number = 0xafafaf;

	// Expect no side effect on secondary
	mock.selectPrimary(new_primary);
	expect(mock.primary).toEqual(new_primary);
	expect(mock.secondary).toEqual(secondary);

	// Expect no side effect on primary
	mock.selectSecondary(new_secondary);
	expect(mock.primary).toEqual(new_primary);
	expect(mock.secondary).toEqual(new_secondary);
    });
});
