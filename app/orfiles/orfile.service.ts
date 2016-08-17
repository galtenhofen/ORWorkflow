import {Component,Injectable,Input,Output,EventEmitter } from 'angular2/core';
import {IORFile} from './orfile';
import {ILoadInfo} from './loadInfo';
import {Http, Request, Response, Headers, RequestOptions, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ORFileService{
        private _orfileUrl = 'http://crp12vdtib03:8080/ORWorkflow/service';
                            //http://crp12vdtib03:8080/ORWorkflow/service/utility
        info: ILoadInfo = { loading : 'no' }; 
        constructor(private _http: Http){ }
    
        getORFilesToday(): Observable<IORFile[]>{
                     return this._http.get(this._orfileUrl)
                    .map((response: Response) => <IORFile[]>response.json())
                    .do(data => console.log("All: " + JSON.stringify(data)))
                    .catch(this.throwStatus);
                    }

        getORFilesByDate(beginDate:string, endDate:string): Observable<IORFile[]>{
                        
                     console.log("URL: " +this._orfileUrl + "/statuss" + "/" + beginDate + "/" + endDate);
                     return this._http.get(this._orfileUrl + "/status" + "/" + beginDate + "/" + endDate)
                    .finally( ()=> this.info.loading = 'no')
                    .map((response: Response) => <IORFile[]>response.json())
                    .do(data => console.log("By Date: " + JSON.stringify(data)))
                    .catch(this.throwStatus);
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
                    .catch(this.throwStatus);
                    }
        
        postReleaseRetry(retries) {
                console.log('IN postReleaseRetry  retries: ' + retries);
                let body = JSON.stringify(retries);
                let headers = new Headers({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });

                return this._http.post(this._orfileUrl + "/ordatalist", body, options)
                    .do(data => console.log("POST Response: " + JSON.stringify(data)))
                    .map(this.checkResponseStatus)
                    .catch(this.throwStatus);
                    }

        private throwStatus(error: Response){
            console.log('IN throwStatus  error.status = ' + error.status);
            console.error(error.status);
            return Observable.throw(error.status || 'Server error');

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