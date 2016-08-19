
import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';  //Load all features
import {bootstrap} from 'angular2/platform/browser';
import {ORFileListComponent} from './orfiles/orfile-list.component';
import {ORFileService} from './orfiles/orfile.service';
import {ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ORFileDetailComponent} from './orfiledetail/orfile-detail.component';


@Component({
    selector: 'orw-app',
    template: `<div><h1> {{pageTitle}} </h1>
    <router-outlet></router-outlet>
    </div>`,
    directives: [ORFileListComponent, ROUTER_DIRECTIVES],
    providers:  [ORFileService, HTTP_PROVIDERS, ROUTER_PROVIDERS]
})


@RouteConfig([
    { path: '/orfiles', name: 'ORFiles', component: ORFileListComponent, useAsDefault: true},
    { path: '/fileDetail/:id', name: 'FileDetail', component: ORFileDetailComponent}
])

export class AppComponent{
    pageTitle: string = 'OR Workflow Status'
}

bootstrap(AppComponent);
