
import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import 'rxjs/Rx';  //Load all features
import {bootstrap} from 'angular2/platform/browser';
import {ORFileListComponent} from './orfiles/orfile-list.component';
import {ORFileService} from './orfiles/orfile.service';


@Component({
    selector: 'orw-app',
    template: `<div><h1> {{pageTitle}} </h1>
   <orw-orfiles></orw-orfiles>
    </div>`,
    directives: [ORFileListComponent],
    providers:  [ORFileService, HTTP_PROVIDERS, ROUTER_PROVIDERS]
})

export class AppComponent{
    pageTitle: string = 'OR Workflow Status'
}

bootstrap(AppComponent);
