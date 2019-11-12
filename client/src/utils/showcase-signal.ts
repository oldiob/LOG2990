import { Observable, Subject } from 'rxjs';

export class ShowcaseSignal {

    private static subject: Subject<null> = new Subject<null>();
    static observable: Observable<null> = ShowcaseSignal.subject.asObservable();

    static emit() {
        this.subject.next(null);
    }
}
