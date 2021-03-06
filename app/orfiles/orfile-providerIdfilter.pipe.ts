import {PipeTransform, Pipe} from 'angular2/core';
import {IORFile} from './orfile';

@Pipe({
    name: 'providerIdFilter'
})

export class ProviderIdFilterPipe implements PipeTransform{

                transform(value: IORFile[], args: string[]): IORFile[]{
                    let filter: string = args[0] ? args[0].toLocaleLowerCase(): null;
                    return filter ? value.filter((orfile: IORFile) =>
                    orfile.providerID.toLocaleLowerCase().indexOf(filter) != -1) : value;
                }
}