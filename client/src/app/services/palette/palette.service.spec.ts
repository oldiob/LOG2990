import { TestBed, inject } from '@angular/core/testing';

import { ColorPalette } from './palette.service';

describe('Service-ColorPalette', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ColorPalette]
        });
    });

    it('should construct correctly', inject([ColorPalette], (service: ColorPalette) => {
        expect(service).toBeTruthy();
        expect(service.primary).
            toEqual(ColorPalette.DEFAULT_PRIMARY);
        expect(service.secondary).
            toEqual(ColorPalette.DEFAULT_SECONDARY);
        expect(service.previous.arr).
            toEqual(new Array<number>(ColorPalette.MAX_HISTORY).fill(ColorPalette.DEFAULT_MEMSET));
    }));

    it('should swap correctly', inject([ColorPalette], (service: ColorPalette) => {
        service.swap();
        expect(service.primary).toEqual(ColorPalette.DEFAULT_SECONDARY);
        expect(service.secondary).toEqual(ColorPalette.DEFAULT_PRIMARY);
    }));

    it('should select the correct color', inject([ColorPalette], (service: ColorPalette) => {
        const NEW_PRIMARY = 0xdeadbeef;
        const NEW_SECONDARY = 0xafafaf;

        // Expect no side effect on secondary
        service.selectPrimary(NEW_PRIMARY);
        expect(service.primary).toEqual(NEW_PRIMARY);
        expect(service.secondary).toEqual(ColorPalette.DEFAULT_SECONDARY);

        // Expect no side effect on primary
        service.selectSecondary(NEW_SECONDARY);
        expect(service.primary).toEqual(NEW_PRIMARY);
        expect(service.secondary).toEqual(NEW_SECONDARY);
    }));

    it('should format the colors correctly', inject([ColorPalette], (service: ColorPalette) => {
        expect(service.getPrimary())
            .toEqual(`#${ColorPalette.DEFAULT_PRIMARY.toString(16)}`)
        expect(service.getSecondary())
            .toEqual(`#${ColorPalette.DEFAULT_SECONDARY.toString(16)}`);
        const history: string[] = service.getHistory();
        history.forEach((value: string) => expect(value)
            .toEqual(`#${ColorPalette.DEFAULT_MEMSET.toString(16)}`))
    }));
});
