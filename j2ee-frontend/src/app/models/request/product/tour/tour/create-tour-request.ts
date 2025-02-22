export class CreateTourRequest{
    name?: string;
    description?: string;
    startLocation?: string;
    endLocation?: string;
    isActive?: boolean;
    image?: File;
}