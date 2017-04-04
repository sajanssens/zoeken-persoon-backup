import { Injectable } from '@angular/core';

import { Request } from 'anva-core';
import { PersoonUri, PersoonUriVars } from 'anva-contracts';
import { Observable } from 'rxjs/Observable';

import { Persoon } from './persoon';

@Injectable()
export class ZoekenPersoonService {

    constructor(private request: Request) {
    }

    public search(term: string): Observable<Persoon[]> {
        return this.request
            .search<Persoon>(PersoonUri.persoonsearch.var(PersoonUriVars.search, term));
    }

}
