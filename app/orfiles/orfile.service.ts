import { Injectable } from 'angular2/core';
import {IORFile} from './orfile';
import {Http, Request, Response, Headers, RequestOptions, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ORFileService{
        private _orfileUrl = 'http://crp12vdtib03:8080/ORWorkflow/service/status';
       // private _orfileUrl = 'http://crp12vdtibapp09:10430/WebService/ORWorkflowService/ORWorkflowService.serviceagent/ORWorkflowService';

        constructor(private _http: Http){ }

        getORFilesToday(): Observable<IORFile[]>{
                     return this._http.get(this._orfileUrl)
                    .map((response: Response) => <IORFile[]>response.json())
                    .do(data => console.log("All: " + JSON.stringify(data)))
                    .catch(this.handleError);
                    }

        getORFilesByDate(beginDate:string, endDate:string): Observable<IORFile[]>{
                        
                     console.log("URL: " +this._orfileUrl + "/" + beginDate + "/" + endDate);
                     return this._http.get(this._orfileUrl + "/" + beginDate + "/" + endDate)
                    .map((response: Response) => <IORFile[]>response.json())
                    .do(data => console.log("By Date: " + JSON.stringify(data)))
                    .catch(this.handleError);
                    }

        private handleError(error: Response){
            console.error(error);
            return Observable.throw(error.json().error || 'Server error');
        }
}