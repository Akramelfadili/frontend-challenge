export interface JsonData {
     date : string
     volume : number
}
export interface ChartData {
     name : string
     value : number
     date : string
}
export  interface Category {
     id: number;
     name: string;
     nbKeywords: number;
     depth: number;
     ancestors: Ancestors[];
}

export interface Ancestors {
     id: number;
     name: string;
 }
export interface DT {
     value: number;
     viewValue: string;
}