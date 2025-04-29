export interface City {
    id: string;
    name: string;
    status: 'ACTIVE' | 'INACTIVE';
    createdAt: string;
    updatedAt: string;
}
  
export interface CityCreateForm {
    name: string;
}

export interface CityUpdateForm {
    name: string;
    status: 'ACTIVE' | 'INACTIVE' | string;
}
