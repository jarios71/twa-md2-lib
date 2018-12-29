import { TWAFilterEditorComponent } from './twa-md2-filter-editor.component';
import { FieldFilter } from './twa-md2-filter-editor.interface';
export declare class TWAFilterEditorService {
    filters: FieldFilter[];
    filteredData: any[];
    filter: TWAFilterEditorComponent;
    data: any[];
    prepareData: Function;
    processedFilters: any[];
    init(filter: TWAFilterEditorComponent, data: any[], prepareData?: Function): void;
    applyFilter(data?: any[]): any[];
    applyFilterToRow(item: any): boolean;
    processFilterOrs: (filters: any) => any[];
    filterData: (filter: any, filterValue: any) => boolean;
    filterGroup: (filter: any, filterValue: any) => any;
}
