export interface RouteCreateForm {
    distance: number;
    duration: number;
    price: number;
    departureStationId: string;
    arrivalStationId: string;
    status: 'ACTIVE' | 'INACTIVE';
}

export interface RouteUpdateForm {
    id: string; // hoặc routeId nếu backend yêu cầu tên khác
    distance: number;
    duration: number;
    price: number;
    departureStationId: string;
    arrivalStationId: string;
    status: 'ACTIVE' | 'INACTIVE';
}
