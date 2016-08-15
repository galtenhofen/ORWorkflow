import { Injectable } from 'angular2/core';
import {IORFile} from './orfile';
import {Http, Request, Response, Headers, RequestOptions, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ORFileService{
        private _orfileUrl = 'http://crp12vdtib03:8080/ORWorkflow/service';
                            //http://crp12vdtib03:8080/ORWorkflow/service/utility
                          
        constructor(private _http: Http){ }
    
        getORFilesToday(): Observable<IORFile[]>{
                     return this._http.get(this._orfileUrl)
                    .map((response: Response) => <IORFile[]>response.json())
                    .do(data => console.log("All: " + JSON.stringify(data)))
                    .catch(this.handleError);
                    }

        getORFilesByDate(beginDate:string, endDate:string): Observable<IORFile[]>{
                        
                     console.log("URL: " +this._orfileUrl + "/status" + "/" + beginDate + "/" + endDate);
                     return this._http.get(this._orfileUrl + "/status" + "/" + beginDate + "/" + endDate)
                    .map((response: Response) => <IORFile[]>response.json())
                    .do(data => console.log("By Date: " + JSON.stringify(data)))
                    .catch(this.handleError);
                    }

        postRunUtilities(utilities) {
                console.log('IN postRunUtility  utilities: ' + utilities);
                let body = JSON.stringify(utilities);
                //let body = "{" + utility + "}";
                let headers = new Headers({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });

                return this._http.post(this._orfileUrl + "/ordatalist", body, options)
                    .do(data => console.log("POST Response: " + JSON.stringify(data)))
                    .map(this.checkResponseStatus)
                    .catch(this.handleError);
                    }
        
        postReleaseRetry(retries) {
                console.log('IN postReleaseRetry  retries: ' + retries);
                let body = JSON.stringify(retries);
                let headers = new Headers({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });

                return this._http.post(this._orfileUrl + "/ordatalist", body, options)
                    .do(data => console.log("POST Response: " + JSON.stringify(data)))
                    .map(this.checkResponseStatus)
                    .catch(this.handleError);
                    }

        private handleError(error: Response){
            console.error(error);
            return Observable.throw(error.json().error || 'Server error');
        }

        private checkResponseStatus(res: Response) {
            let status;

            // check if empty, before call json
             if (res.status) {
                status = res.status;
                }
console.log('IN  checkResponseStatus STATUS:' + status);
            return status || {};
        }
}