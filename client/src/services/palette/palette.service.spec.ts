import { inject, TestBed } from '@angular/core/testing';

import { PaletteService } from './palette.service';
import { Color } from 'src/utils/color';

describe('PaletteService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PaletteService],
        });
    });

    it('should construct correctly', inject([PaletteService], (service: PaletteService) => {
        expect(service).toBeTruthy();
        expect(service.primary).
            toEqual(PaletteService.DEFAULT_PRIMARY);
        expect(service.secondary).
            toEqual(PaletteService.DEFAULT_SECONDARY);
        expect(service.previous.arr).
            toEqual(new Array<Color>(PaletteService.MAX_HISTORY).fill(PaletteService.DEFAULT_MEMSET));
    }));

    it('should swap correctly', inject([PaletteService], (service: PaletteService) => {
        service.swap();
        expect(service.primary).toEqual(PaletteService.DEFAULT_SECONDARY);
        expect(service.secondary).toEqual(PaletteService.DEFAULT_PRIMARY);
    }));

    it('should select the correct color', inject([PaletteService], (service: PaletteService) => {
        const NEW_PRIMARY = new Color(242, 123, 32, 0);
        const NEW_SECONDARY = new Color(21, 13, 212, 123);

        // Expect no side effect on secondary
        service.selectPrimary(NEW_PRIMARY.red, NEW_PRIMARY.blue, NEW_PRIMARY.green, NEW_PRIMARY.alpha);
        expect(service.primary).toEqual(NEW_PRIMARY);
        expect(service.secondary).toEqual(PaletteService.DEFAULT_SECONDARY);

        // Expect no side effect on primary
        service.selectSecondary(NEW_SECONDARY.red, NEW_SECONDARY.blue, NEW_SECONDARY.green, NEW_SECONDARY.alpha);
        expect(service.primary).toEqual(NEW_PRIMARY);
        expect(service.secondary).toEqual(NEW_SECONDARY);
    }));

    it('should format the colors correctly', inject([PaletteService], (service: PaletteService) => {
        const PRIMARY = PaletteService.DEFAULT_PRIMARY;
        const SECONDARY = PaletteService.DEFAULT_SECONDARY;

        expect(service.getPrimary())
            .toEqual(`rgba(${PRIMARY.red}, ${PRIMARY.green}, ${PRIMARY.blue}, ${PRIMARY.alpha})`);
        expect(service.getSecondary())
            .toEqual(`rgba(${SECONDARY.red}, ${SECONDARY.green}, ${SECONDARY.blue}, ${SECONDARY.alpha})`);
        const history: Color[] = service.getHistory();

        history.forEach((value: Color) => expect(value)
            .toEqual(PaletteService.DEFAULT_MEMSET));
    }));
});
