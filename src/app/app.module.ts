import { CookieService } from 'angular2-cookie/core';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AuthService, Request } from 'anva-core';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';

import { BaseComponent, UseCaseManager } from 'anva-contracts';
import { NvUiModule, NvAppComponent } from 'anva-ui-components';

// App is our top level component
import { AppRoutingModule } from './app.routes';
import { ZoekenPersoonComponent } from './zoeken-persoon.component';
import { ZoekenPersoonService } from './zoeken-persoon.service';


import '../../node_modules/anva-ui-components/lib/styles/a.scss';

// Application wide providers
const APP_PROVIDERS = [
  CookieService,
  ZoekenPersoonService,
  Request,
  AuthService,
  UseCaseManager
];

@NgModule({
  bootstrap: [NvAppComponent],
  declarations: [
    ZoekenPersoonComponent,
    NvAppComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    NvUiModule,    
    AppRoutingModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class AppModule { }
