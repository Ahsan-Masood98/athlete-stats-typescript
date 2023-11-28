export interface Athlete {
    id: number;
    serial?:number
    name: string;
    gender_id: number;
    gender?: Gender
  
  }
  
  export interface Gender {
    id: number;
    name: string;
  }
  