export interface StationCreateForm {
    name: string;
    address: string;
    longitude: number;
    latitude: number;
    status: string;
    cityId: string;
}

export interface StationUpdateForm {
    name: string;
    address: string;
    longitude: number;
    latitude: number;
    status: string;
    cityId: string;
}
