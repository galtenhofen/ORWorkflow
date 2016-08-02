import {PipeTransform, Pipe} from 'angular2/core';
import {IORFile} from './orfile';

@Pipe({
    name: 'orfileFilter'
})

export class ORFileFilterPipe implements PipeTransform{

                transform(value:IORFile[], args: string[]): IORFile[]{
                    console.log("args:" + args);
                    let provfilter: string = args[0] ? args[0].toLocaleLowerCase(): null;
                    let filefilter: string = args[1] ? args[1].toLocaleLowerCase(): null;
                    let subfilter: string = args[2] ? args[2].toLocaleLowerCase(): null;
                    let statfilter: string = args[3] ? args[3].toLocaleLowerCase(): null;

                    console.log("prov: " + provfilter + " - file: " + filefilter + " - sub: " + subfilter + " - stat: " + statfilter)

            if(provfilter){
                value = value.filter((orfile: IORFile) =>
                    orfile.providerID.toLocaleLowerCase().indexOf(provfilter) != -1);
                       
            }
             if(filefilter){
                value = value.filter((value: IORFile) =>
                    value.fileType.toLocaleLowerCase().indexOf(filefilter) != -1);
                    
            }
             if(subfilter){
                value = value.filter((value: IORFile) =>
                    value.fileType_SubsystemDetailType.toLocaleLowerCase().indexOf(subfilter) != -1);
                       
            }
             if(statfilter){
                value = value.filter((value: IORFile) =>
                    value.processStatus.toLocaleLowerCase().indexOf(statfilter) != -1);
                    
            }
           return value;
                
            }
}