export interface FilterEditorOptions {
    title: string;
    fields: FieldFilter[];
    results: any[];
}
export interface OperationData {
    type: string;
    label: string;
    operator: string;
}
export interface FilterEditorConfig {
    operationsData: OperationData[];
    filter?: FieldFilter[];
    texts?: any;
}
export interface FieldFilter {
    color: string;
    field: string;
    dbfield?: string;
    name: string;
    label?: string;
    bitwise?: string;
    operation?: string;
    explanation?: string;
    value?: string;
    selected?: boolean;
    isgroup?: boolean;
    fields?: any[];
}
