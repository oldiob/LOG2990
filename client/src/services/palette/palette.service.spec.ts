import { Color } from 'src/utils/color';
import { PaletteService } from './palette.service';

describe('PaletteService', () => {

    let service: PaletteService;

    beforeEach(() => {
        service = new PaletteService();
    });

    it('should construct correctly', () => {
        expect(service).toBeTruthy();
        expect(service.primary).
            toEqual(PaletteService.DEFAULT_PRIMARY);
        expect(service.secondary).
            toEqual(PaletteService.DEFAULT_SECONDARY);
        expect(service.previous.arr).
            toEqual(new Array<Color>(PaletteService.MAX_HISTORY).fill(PaletteService.DEFAULT_MEMSET));
    });

    it('should swap correctly', () => {
        service.swap();
        expect(service.primary).toEqual(PaletteService.DEFAULT_SECONDARY);
        expect(service.secondary).toEqual(PaletteService.DEFAULT_PRIMARY);
    });

    it('should select the correct color', () => {
        const colorEqual = (A: Color, B: Color): boolean => {
            return ((A.red === B.red) &&
                (A.green === B.green) &&
                (A.blue === B.blue) &&
                (A.alpha === B.alpha));
        };
        const NEW_PRIMARY = new Color(242, 123, 32, 0);
        const NEW_SECONDARY = new Color(21, 13, 212, 123);

        // Expect no side effect on secondary
        service.selectPrimary(NEW_PRIMARY.red, NEW_PRIMARY.green, NEW_PRIMARY.blue, NEW_PRIMARY.alpha);
        expect(colorEqual(service.primary, NEW_PRIMARY)).toBeTruthy();
        expect(colorEqual(service.secondary, PaletteService.DEFAULT_SECONDARY)).toBeTruthy();

        // Expect no side effect on primary
        service.selectSecondary(NEW_SECONDARY.red, NEW_SECONDARY.green, NEW_SECONDARY.blue, NEW_SECONDARY.alpha);
        expect(colorEqual(service.primary, NEW_PRIMARY)).toBeTruthy();
        expect(colorEqual(service.secondary, NEW_SECONDARY)).toBeTruthy();
    });

    it('should format the colors correctly', () => {
        const PRIMARY = PaletteService.DEFAULT_PRIMARY;
        const SECONDARY = PaletteService.DEFAULT_SECONDARY;

        expect(service.getPrimary())
            .toEqual(PRIMARY.toString());
        expect(service.getSecondary())
            .toEqual(SECONDARY.toString());
        const history: Color[] = service.getHistory();
        history.forEach((value: Color) => expect(value)
            .toEqual(PaletteService.DEFAULT_MEMSET));
    });
});
