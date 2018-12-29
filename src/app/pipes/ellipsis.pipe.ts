import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'ellipsis'
})

export class EllipsisPipe implements PipeTransform {

transform(str: string, params: string[]): string {

    const length = (params.length > 0) ? parseInt(params[0], 10) : 50;
    const ellipsis = (params.length > 1) ? params[1] : '...';

    return (str.length > length) ? str.substring(0, length) + ellipsis : str;

   }
}
