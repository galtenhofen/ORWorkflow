System.register(['angular2/core', 'angular2/http', 'angular2/router', 'rxjs/Rx', 'angular2/platform/browser', './orfiles/orfile-list.component', './orfiles/orfile.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, router_1, browser_1, orfile_list_component_1, orfile_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (_1) {},
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (orfile_list_component_1_1) {
                orfile_list_component_1 = orfile_list_component_1_1;
            },
            function (orfile_service_1_1) {
                orfile_service_1 = orfile_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.pageTitle = 'OR Workflow Status';
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'orw-app',
                        template: "<div><h1> {{pageTitle}} </h1>\n   <orw-orfiles></orw-orfiles>\n    </div>",
                        directives: [orfile_list_component_1.ORFileListComponent],
                        providers: [orfile_service_1.ORFileService, http_1.HTTP_PROVIDERS, router_1.ROUTER_PROVIDERS]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
            browser_1.bootstrap(AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map