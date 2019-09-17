import { TestBed, inject } from '@angular/core/testing';

import { PaletteService } from './palette.service';

describe('PaletteService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PaletteService]
        });
    });

    it('should construct correctly', inject([PaletteService], (service: PaletteService) => {
        expect(service).toBeTruthy();
        expect(service.primary).
            toEqual(PaletteService.DEFAULT_PRIMARY);
        expect(service.secondary).
            toEqual(PaletteService.DEFAULT_SECONDARY);
        expect(service.previous.arr).
            toEqual(new Array<number>(PaletteService.MAX_HISTORY).fill(PaletteService.DEFAULT_MEMSET));
    }));

    it('should swap correctly', inject([PaletteService], (service: PaletteService) => {
        service.swap();
        expect(service.primary).toEqual(PaletteService.DEFAULT_SECONDARY);
        expect(service.secondary).toEqual(PaletteService.DEFAULT_PRIMARY);
    }));

    it('should select the correct color', inject([PaletteService], (service: PaletteService) => {
        const NEW_PRIMARY = 0xdeadbeef;
        const NEW_SECONDARY = 0xafafaf;

        // Expect no side effect on secondary
        service.selectPrimary(NEW_PRIMARY);
        expect(service.primary).toEqual(NEW_PRIMARY);
        expect(service.secondary).toEqual(PaletteService.DEFAULT_SECONDARY);

        // Expect no side effect on primary
        service.selectSecondary(NEW_SECONDARY);
        expect(service.primary).toEqual(NEW_PRIMARY);
        expect(service.secondary).toEqual(NEW_SECONDARY);
    }));

    it('should format the colors correctly', inject([PaletteService], (service: PaletteService) => {
        expect(service.getPrimary())
            .toEqual(`#${PaletteService.DEFAULT_PRIMARY.toString(16)}`)
        expect(service.getSecondary())
            .toEqual(`#${PaletteService.DEFAULT_SECONDARY.toString(16)}`);
        const history: string[] = service.getHistory();
        history.forEach((value: string) => expect(value)
            .toEqual(`#${PaletteService.DEFAULT_MEMSET.toString(16)}`))
    }));
});
