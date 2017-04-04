import { AuthService } from 'anva-core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { BaseComponent, UseCaseManager, UseCase, UseCases } from 'anva-contracts';

import { ZoekenPersoonService } from './zoeken-persoon.service';
import { Persoon } from './persoon';

@Component({
    templateUrl: './zoeken-persoon.component.html'
})

export class ZoekenPersoonComponent extends BaseComponent implements OnInit {
    private personen: Observable<Persoon[]>; // subscribed via async pipe in template

    // A Subject is a producer of an observable event stream; 
    // searchTerms produces an Observable of strings, the filter criteria for the search.
    private searchTerms = new Subject<string>();

    constructor(
        private persoonSearchService: ZoekenPersoonService,
        public useCaseManager: UseCaseManager,
        public route: ActivatedRoute,
        public authService: AuthService
    ) {
        super(useCaseManager, route, authService);
    }

    public ngOnInit(): void {
        super.ngOnInit();
        this.personen = this.searchTerms
            .debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous      
            .switchMap((term) => term // switch to new observable each time the term changes        
                // return the http search observable
                ? this.persoonSearchService.search(term)
                // or the observable of empty personen if there was no search term
                : Observable.of<Persoon[]>([]))
            .catch((error) => {
                console.error(error);
                return Observable.of<Persoon[]>([]);
            });
    }

    private search(term: string): void {
        // put a new string into this subject's observable stream by calling next.
        this.searchTerms.next(term);
    }

    private clickRow(persoon: Persoon): void {
        this.finishOk({ id : persoon.id });
    }
}