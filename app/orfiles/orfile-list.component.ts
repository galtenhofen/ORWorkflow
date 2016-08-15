import {IORFile} from './orfile';
import {IUtility} from './utility';
import {IRetry} from './retry';
import {Component, OnInit} from 'angular2/core';
import {ProviderIdFilterPipe} from './orfile-providerIdfilter.pipe';
import {FileTypeFilterPipe} from './orfile-fileTypefilter.pipe';
import {SubsystemFilterPipe} from './orfile-subsystemfilter.pipe';
import {ORFileFilterPipe} from './orfile-orfilefilter.pipe';
import {bootstrap} from 'angular2/platform/browser';
import {UtilityListComponent} from '../utilities/utility-list.component';
import {ORFileService} from './orfile.service';
import {ConfirmService} from "../shared/confirm/confirm.service";
import {ConfirmComponent} from "../shared/confirm/confirm.component";
declare var componentHandler:any;

@Component({
selector: 'orw-orfiles',
templateUrl: 'app/orfiles/orfile-list.component.html',
styleUrls: ['app/orfiles/orfile-list.component.css', 'app/shared/confirm/confirm.component.css'],
pipes:([ProviderIdFilterPipe],[FileTypeFilterPipe],[SubsystemFilterPipe],[ORFileFilterPipe]),
directives: [UtilityListComponent, ConfirmComponent],
providers: [ConfirmService]

})
export class ORFileListComponent
                implements OnInit{
    pageTitle: string = 'OR Status';
    providerFilter: string = '';
    fileTypeFilter: string = '';
    subsystemFilter: string = '';
    statusFilter: string = '';
    errorMessage: string;
    beginDate: string;
    endDate: string;
    currentORFileGroupId: string;
    orfiles: IORFile[];
    retryList: any[] = [];
    utilityList: any[] = [];
    postDataUtilities: string;
    postRetries: string;
    utilityObjects: IUtility[] = [];
    retryObjects: IRetry[] = [];
    retry: IRetry;
    utility: IUtility;
    confirmResponse:string = '';

constructor(private _orfileService: ORFileService, private _confirmService:ConfirmService){

}


    ngOnInit(): any{
         console.log('IN  OnInit');
     componentHandler.upgradeDom();
     console.log('Set Dates to Current');    
     //var dateBegin: Date = new Date();
     //var dateEnd: Date = new Date();

     this.beginDate = this.formatDate(new Date());
     this.endDate = this.formatDate(new Date());

     //this.beginDate = ((dateBegin).getFullYear()).toString() + "-" + ((dateBegin).getMonth()).toString() + "-" + ((dateBegin).getDate()).toString();
     //this.endDate = ((dateEnd).getFullYear()).toString() + "-" + ((dateEnd).getMonth()).toString() + "-" + ((dateEnd).getDate()).toString();


    console.log('BeginDate: ' + this.beginDate + "   EndDate:  " + this.endDate );


    console.log('Retrieving OR Files...');

      // this._orfileService.getORFilesToday()
      this._orfileService.getORFilesByDate(this.beginDate, this.endDate)
                .subscribe(
                    orfiles => this.orfiles = orfiles,
                    error => this.errorMessage = <any>error);

    }


 showConfirmDialog(stringTitle) {
     console.log('IN showConfirmDialog  action: ' + stringTitle);
     var stringMessage:string;
     if(stringTitle === "DataUtilties"){
         stringMessage = "Are you sure you want to run selected Data Utilities?"
     }
      if(stringTitle === "ReleaseRetry"){
         stringMessage = "Are you sure you want to release selected Retry items?"


     }
        this._confirmService.activate(stringMessage, stringTitle)
       .then(res => this.completeRequest(stringTitle, res));
                //this.completeRequest(stringTitle, res));
           //.then(res => console.log(`Confirmed: ${res}`));

   }

   completeRequest(strTitle, boolConfirm) {

           if(boolConfirm){
               if(strTitle === "DataUtilities"){
                    this._orfileService.postRunUtilities(this.utilityObjects)
                    .subscribe(
                    data => this.postDataUtilities = JSON.stringify(data), 
                    error => this.errorMessage = <any>error);
                }
                if(strTitle === "ReleaseRetry"){
                    this._orfileService.postReleaseRetry(this.retryObjects)
                    .subscribe(
                    data => this.postRetries = JSON.stringify(data), 
                    error => this.errorMessage = <any>error);
                }
            }
            else{console.log('Requested cancelled by user');}
   }


    onClickrefreshORList(): void{
        var run:boolean = this.validateReceivedDates(this.beginDate, this.endDate);
        console.log('After Validate.  run: ' + run);
        if (run == true){
        console.log('Refreshing OR Files...');
          this._orfileService.getORFilesByDate(this.beginDate, this.endDate)
                .subscribe(
                    orfiles => this.orfiles = orfiles,
                    error => this.errorMessage = <any>error);
        }
        else{
            console.log('You fucked up the dates');
        }
    }

     onToggleRetry(ordfgId, checked, processStep, providerId): void{
        console.log('Retry button clicked.  ORDataFileGroupId: ' + ordfgId + '  Current value = ' + checked + '  Step: ' + processStep + '  ProviderId: ' + providerId);
        
       this.retry = {"orDataFileGroupId": ordfgId, "providerId": providerId, "step": processStep, "userName" : "galtenhofen"   };

        if(checked == true){
        this.retryObjects.push(this.retry);
        console.log('retryObj: ' + this.retryObjects);
        console.log('stringify retryObj: ' + JSON.stringify(this.retryObjects));
        }
        else{

            for(var i = 0; i <  this.retryObjects.length; i++) {
                if( this.retryObjects[i].orDataFileGroupId == ordfgId) {
                     this.retryObjects.splice(i, 1);
                    break;
                    }
        }

          console.log('stringify retryObj: ' + JSON.stringify(this.retryObjects));
        }
    }


/*  ORIGINAL

    onToggleRetry(ordfgId, checked, processStep, providerId): void{
        console.log('Retry button clicked.  ORDataFileGroupId: ' + ordfgId + '  Current value = ' + checked + '  Step: ' + processStep);
        
        if(checked == true){
        this.retryList.push(ordfgId,processStep);
        console.log('retryList: ' + this.retryList);
        }
        else{
           var removeIndex = this.retryList.indexOf(ordfgId);
           this.retryList.splice(removeIndex,2)
           console.log('retryList: ' + this.retryList);
        }
    }*/

    onClickReleaseRetry(): void{
        console.log('Release Retry Items');
        console.log('utilityList: ' + this.utilityList);

        this._orfileService.postReleaseRetry(this.retryObjects)
                .subscribe(
                    data => this.postRetries = JSON.stringify(data), 
                    error => this.errorMessage = <any>error);
    }

    onClickRunDataUtilities(): void{
        console.log('IN onClickRunDataUtilties  ');
        console.log('utilityList: ' + this.utilityList);


        this._orfileService.postRunUtilities(this.utilityObjects)
                .subscribe(
                    data => this.postDataUtilities = JSON.stringify(data), 
                    error => this.errorMessage = <any>error);
    }

    onClickClose(): void{
        console.log('Close App');
    }

    onChangeDateReceivedFrom(selectedDate): void{
        console.log('Changed Date Received From.  Setting this.beginDate');
        console.log('Selected Date: ' + selectedDate);
       // this.beginDate = selectedDate.toString();
        console.log('Begin Date: ' + this.beginDate);
       // var beginString: string = ((this.beginDate).getFullYear()).toString() + "/" + ((this.beginDate).getMonth()).toString() + "/" + ((this.beginDate).getDay()).toString();
        //console.log('beginString: ' + beginString);

    }

    onChangeDateReceivedTo(selectedDate): void{
        console.log('Changed Date Received To');
     //   this.endDate = selectedDate.toString();
        //var endString: string = ((this.endDate).getFullYear()).toString() + "/" + ((this.endDate).getMonth()).toString() + "/" + ((this.endDate).getDay()).toString();        
        console.log('End Date: ' + this.endDate);
    }
/*
  onUtilitySelected(message:string, ordfgId, providerId): void{
         console.log('IN onUtilitySelected  orfile-list component ');
         console.log('IN onUtilitySelected  message: ' + message);
        console.log('IN onUtilitySelected  ORDataFileGroupId: ' + ordfgId + '  ProviderId: ' + providerId  );

         if(message == '2' || message == '3'){

            //var existIndex = this.utilityList.indexOf("orDataFileGroupId:"+ordfgId);
            
            console.log('IN onUtilitySelected  ORDataFileGroupId : '+ ordfgId + ' exists in arraty at position ' + existIndex);
            
            if(existIndex > -1){
                this.utilityList.splice(existIndex,3)
                console.log('IN onUtilitySelected utilityList: ' + this.utilityList);
                }
    
                if(message == '2'){   
                    this.utilityList.push(ordfgId, providerId, "unconvert"); 
                    //this.utilityList.push("orDataFileGroupId:"+ordfgId, "providerId:"+providerId, "type:unconvert");
                }
                else if(message == '3'){
                    this.utilityList.push(ordfgId, providerId, "purgeAll"); 
                   // this.utilityList.push("orDataFileGroupId:"+ordfgId, "providerId:"+providerId, "type:purgeAll");
                }
             console.log('IN onUtilitySelected utilityList: ' + this.utilityList);
    
        }
        else{
            var existIndex = this.utilityList.indexOf("orDataFileGroupId:"+ordfgId);
            console.log('IN onUtilitySelected  ORDataFileGroupId : '+ ordfgId + ' exists in arraty at position ' + existIndex);
            if(existIndex > -1){
                this.utilityList.splice(existIndex,3)
                console.log('IN onUtilitySelected utilityList: ' + this.utilityList);
            }
            else{
            console.log('IN onUtilitySelected  NO UTILITY CHOSEN: ');
            console.log('IN onUtilitySelected utilityList: ' + this.utilityList);
       	    }
        }
    }*/


    onUtilitySelected(message:string, ordfgId, providerId): void{
         console.log('IN onUtilitySelected  orfile-list component ');
         console.log('IN onUtilitySelected  message: ' + message);
         console.log('IN onUtilitySelected  ORDataFileGroupId: ' + ordfgId + '  ProviderId: ' + providerId  );
        var type: string;

        if(message == '2'){type = 'unconvert'}
        else if(message == '3'){type = 'purgeAll'}
        else{type = ''}

        this.utility = {"orDataFileGroupId": ordfgId, "providerId": providerId, "step": type, "userName" : "galtenhofen"  };

             for(var i = 0; i <  this.utilityObjects.length; i++) {
                if( this.utilityObjects[i].orDataFileGroupId == ordfgId) {
                     this.utilityObjects.splice(i, 1);
                    break;
                    }
                }

        if(message == '2' || message == '3'){
            this.utilityObjects.push(this.utility);
            console.log('retryObj: ' + this.retryObjects);
            console.log('stringify retryObj: ' + JSON.stringify(this.utilityObjects)); 
        }
  
    }

    formatDate(dateToFormat:Date): string{
    var dayNum:number = dateToFormat.getDate();
    var monthNum:number = dateToFormat.getMonth();
    var dayString:string;
    var monthString:string;

    if(dayNum < 10)
    {dayString = '0'+ dayNum.toString()}
    else 
    {dayString = dayNum.toString()}
    if(monthNum < 10)
    {monthString = '0' + (monthNum + 1).toString()}
    else
    {monthString = monthNum.toString()}

    console.log('IN  formatDate : ' + dateToFormat.getFullYear().toString() +"-"+monthString+"-"+dayString);

    return (dateToFormat.getFullYear().toString() +"-"+monthString+"-"+dayString)

    }

    validateReceivedDates(beginDate, endDate): boolean{
        console.log('IN  validateReceivedDates');
        if(endDate < beginDate){
        return false;
        }
        else return true;
    }

    buildRunUtility(utilityList:any[]){
        var jsonData = {};

    }

    containsObject(ordfgid){
        if (this.utilityList.filter(function(e){return e.orDataFileGroupId == ordfgid}).length>0) {
        }
    }

       makeTableScroll() {
            var maxRows = 10;

            var table: any = (<HTMLInputElement>document.getElementById('orFilesTable')).value;
            var wrapper: any = (<HTMLInputElement>document.getElementById('orFilesTable')).parentNode;
            //var wrapper = table.parentNode;
            var rowsInTable = table.rows.length;
            var height = 0;
            if (rowsInTable > maxRows) {
                for (var i = 0; i < maxRows; i++) {
                    height += table.rows[i].clientHeight;
                }
                wrapper.style.height = height + "px";
            }
        }

}
