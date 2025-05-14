export interface ScheduleCreateForm {
    routeId: string;
    coachId: string;
    departureTime: string;
    status: 'ACTIVE' | 'INACTIVE';
}
export interface ScheduleUpdateForm {
    routeId: string;
    coachId: string;
    departureTime: string;
    status: 'ACTIVE' | 'INACTIVE';
}  