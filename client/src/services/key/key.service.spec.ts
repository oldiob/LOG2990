import { TestBed } from '@angular/core/testing';

import { KeyService } from './key.service';

describe('KeyService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: KeyService = TestBed.get(KeyService);
        expect(service).toBeTruthy();
    });
    it('should disable keys properly', () => {
        const service: KeyService = TestBed.get(KeyService);
        service.disableKeys();
        expect(service.isShortcutsEnabled).toBeFalsy();
    });
    it('should enable keys properly', () => {
        const service: KeyService = TestBed.get(KeyService);
        service.enableKeys();
        expect(service.isShortcutsEnabled).toBeTruthy();
    });
    it('should enable text edit properly', () => {
        const service: KeyService = TestBed.get(KeyService);
        service.enableTextEdit();
        expect(service.isTextEnabled).toBeTruthy();
    });
    it('should disable text edit properly', () => {
        const service: KeyService = TestBed.get(KeyService);
        service.disableTextEdit();
        expect(service.isTextEnabled).toBeFalsy();
    });
});
