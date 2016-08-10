System.register(['angular2/core', './orfile-providerIdfilter.pipe', './orfile-fileTypefilter.pipe', './orfile-subsystemfilter.pipe', './orfile-orfilefilter.pipe', '../utilities/utility-list.component', './orfile.service'], function(exports_1, context_1) {
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
    var core_1, orfile_providerIdfilter_pipe_1, orfile_fileTypefilter_pipe_1, orfile_subsystemfilter_pipe_1, orfile_orfilefilter_pipe_1, utility_list_component_1, orfile_service_1;
    var ORFileListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (orfile_providerIdfilter_pipe_1_1) {
                orfile_providerIdfilter_pipe_1 = orfile_providerIdfilter_pipe_1_1;
            },
            function (orfile_fileTypefilter_pipe_1_1) {
                orfile_fileTypefilter_pipe_1 = orfile_fileTypefilter_pipe_1_1;
            },
            function (orfile_subsystemfilter_pipe_1_1) {
                orfile_subsystemfilter_pipe_1 = orfile_subsystemfilter_pipe_1_1;
            },
            function (orfile_orfilefilter_pipe_1_1) {
                orfile_orfilefilter_pipe_1 = orfile_orfilefilter_pipe_1_1;
            },
            function (utility_list_component_1_1) {
                utility_list_component_1 = utility_list_component_1_1;
            },
            function (orfile_service_1_1) {
                orfile_service_1 = orfile_service_1_1;
            }],
        execute: function() {
            //import {ngTableResize} from '../../node_modules/angular-table-resize/dist/angular-table-resize.js';
            //import {ConfirmService} from "../shared/confirm/confirm.service";
            //import {ConfirmComponent} from "../shared/confirm/confirm.component";
            //declare var componentHandler:any;
            ORFileListComponent = (function () {
                // resizeMode: string = "BasicResizer";
                function ORFileListComponent(_orfileService) {
                    this._orfileService = _orfileService;
                    this.pageTitle = 'OR Status';
                    this.providerFilter = '';
                    this.fileTypeFilter = '';
                    this.subsystemFilter = '';
                    this.statusFilter = '';
                    this.retryList = [];
                    this.utilityList = [];
                }
                ORFileListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log('IN  OnInit');
                    console.log('Set Dates to Current');
                    //var dateBegin: Date = new Date();
                    //var dateEnd: Date = new Date();
                    this.beginDate = this.formatDate(new Date());
                    this.endDate = this.formatDate(new Date());
                    //this.beginDate = ((dateBegin).getFullYear()).toString() + "-" + ((dateBegin).getMonth()).toString() + "-" + ((dateBegin).getDate()).toString();
                    //this.endDate = ((dateEnd).getFullYear()).toString() + "-" + ((dateEnd).getMonth()).toString() + "-" + ((dateEnd).getDate()).toString();
                    console.log('BeginDate: ' + this.beginDate + "   EndDate:  " + this.endDate);
                    console.log('Retrieving OR Files...');
                    // this._orfileService.getORFilesToday()
                    this._orfileService.getORFilesByDate(this.beginDate, this.endDate)
                        .subscribe(function (orfiles) { return _this.orfiles = orfiles; }, function (error) { return _this.errorMessage = error; });
                };
                /*
                 showConfirmDialog() {
                       this._confirmService.activate("Are you sure?")
                           .then(res => console.log(`Confirmed: ${res}`));
                   }*/
                ORFileListComponent.prototype.onClickrefreshORList = function () {
                    var _this = this;
                    var run = this.validateReceivedDates(this.beginDate, this.endDate);
                    console.log('After Validate.  run: ' + run);
                    if (run == true) {
                        console.log('Refreshing OR Files...');
                        //var beginString: string = ((this.beginDate).getFullYear()).toString() + "/" + ((this.beginDate).getMonth()).toString() + "/" + ((this.beginDate).getDay()).toString();
                        //var endString: string = ((this.endDate).getFullYear()).toString() + "/" + ((this.endDate).getMonth()).toString() + "/" + ((this.endDate).getDay()).toString();
                        this._orfileService.getORFilesByDate(this.beginDate, this.endDate)
                            .subscribe(function (orfiles) { return _this.orfiles = orfiles; }, function (error) { return _this.errorMessage = error; });
                    }
                    else {
                        console.log('You fucked up the dates');
                    }
                };
                ORFileListComponent.prototype.onToggleRetry = function (ordfgId, checked, processStep) {
                    console.log('Retry button clicked.  ORDataFileGroupId: ' + ordfgId + '  Current value = ' + checked + '  Step: ' + processStep);
                    if (checked == true) {
                        this.retryList.push(ordfgId, processStep);
                        console.log('retryList: ' + this.retryList);
                    }
                    else {
                        var removeIndex = this.retryList.indexOf(ordfgId);
                        this.retryList.splice(removeIndex, 2);
                        console.log('retryList: ' + this.retryList);
                    }
                };
                ORFileListComponent.prototype.onClickReleaseRetry = function () {
                    console.log('Release Retry Items');
                };
                ORFileListComponent.prototype.onClickRunDataUtilities = function () {
                    console.log('IN onClickRunDataUtilties  ');
                };
                ORFileListComponent.prototype.onClickClose = function () {
                    console.log('Close App');
                };
                ORFileListComponent.prototype.onChangeDateReceivedFrom = function (selectedDate) {
                    console.log('Changed Date Received From.  Setting this.beginDate');
                    console.log('Selected Date: ' + selectedDate);
                    // this.beginDate = selectedDate.toString();
                    console.log('Begin Date: ' + this.beginDate);
                    // var beginString: string = ((this.beginDate).getFullYear()).toString() + "/" + ((this.beginDate).getMonth()).toString() + "/" + ((this.beginDate).getDay()).toString();
                    //console.log('beginString: ' + beginString);
                };
                ORFileListComponent.prototype.onChangeDateReceivedTo = function (selectedDate) {
                    console.log('Changed Date Received To');
                    //   this.endDate = selectedDate.toString();
                    //var endString: string = ((this.endDate).getFullYear()).toString() + "/" + ((this.endDate).getMonth()).toString() + "/" + ((this.endDate).getDay()).toString();        
                    console.log('End Date: ' + this.endDate);
                };
                ORFileListComponent.prototype.onUtilitySelected = function (message, ordfgId, providerId) {
                    console.log('IN onUtilitySelected  orfile-list component ');
                    console.log('IN onUtilitySelected  message: ' + message);
                    console.log('IN onUtilitySelected  ORDataFileGroupId: ' + ordfgId + '  ProviderId: ' + providerId);
                    if (message == '2' || message == '3') {
                        var existIndex = this.utilityList.indexOf(ordfgId);
                        console.log('IN onUtilitySelected  ORDataFileGroupId : ' + ordfgId + ' exists in arraty at position ' + existIndex);
                        if (existIndex > -1) {
                            this.utilityList.splice(existIndex, 3);
                            console.log('IN onUtilitySelected utilityList: ' + this.utilityList);
                        }
                        if (message == '2') {
                            this.utilityList.push(ordfgId, providerId, 'unconvert');
                        }
                        else if (message == '3') {
                            this.utilityList.push(ordfgId, providerId, 'purgeAll');
                        }
                        console.log('IN onUtilitySelected utilityList: ' + this.utilityList);
                    }
                    else {
                        var existIndex = this.utilityList.indexOf(ordfgId);
                        console.log('IN onUtilitySelected  ORDataFileGroupId : ' + ordfgId + ' exists in arraty at position ' + existIndex);
                        if (existIndex > -1) {
                            this.utilityList.splice(existIndex, 3);
                            console.log('IN onUtilitySelected utilityList: ' + this.utilityList);
                        }
                        else {
                            console.log('IN onUtilitySelected  NO UTILITY CHOSEN: ');
                            console.log('IN onUtilitySelected utilityList: ' + this.utilityList);
                        }
                    }
                };
                ORFileListComponent.prototype.formatDate = function (dateToFormat) {
                    var dayNum = dateToFormat.getDate();
                    var monthNum = dateToFormat.getMonth();
                    var dayString;
                    var monthString;
                    if (dayNum < 10) {
                        dayString = '0' + dayNum.toString();
                    }
                    else {
                        dayString = dayNum.toString();
                    }
                    if (monthNum < 10) {
                        monthString = '0' + (monthNum + 1).toString();
                    }
                    else {
                        monthString = monthNum.toString();
                    }
                    console.log('IN  formatDate : ' + dateToFormat.getFullYear().toString() + "-" + monthString + "-" + dayString);
                    return (dateToFormat.getFullYear().toString() + "-" + monthString + "-" + dayString);
                };
                ORFileListComponent.prototype.validateReceivedDates = function (beginDate, endDate) {
                    console.log('IN  validateReceivedDates');
                    if (endDate < beginDate) {
                        return false;
                    }
                    else
                        return true;
                };
                ORFileListComponent = __decorate([
                    core_1.Component({
                        selector: 'orw-orfiles',
                        templateUrl: 'app/orfiles/orfile-list.component.html',
                        styleUrls: ['app/orfiles/orfile-list.component.css', 'app/shared/confirm/confirm.component.css'],
                        pipes: ([orfile_providerIdfilter_pipe_1.ProviderIdFilterPipe], [orfile_fileTypefilter_pipe_1.FileTypeFilterPipe], [orfile_subsystemfilter_pipe_1.SubsystemFilterPipe], [orfile_orfilefilter_pipe_1.ORFileFilterPipe]),
                        directives: [utility_list_component_1.UtilityListComponent]
                    }), 
                    __metadata('design:paramtypes', [orfile_service_1.ORFileService])
                ], ORFileListComponent);
                return ORFileListComponent;
            }());
            exports_1("ORFileListComponent", ORFileListComponent);
        }
    }
});
//# sourceMappingURL=orfile-list.component.js.map