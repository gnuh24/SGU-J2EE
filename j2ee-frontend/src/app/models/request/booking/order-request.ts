import { CreateUserInfoRequest } from "../user/user-info/create-user-info-request";
import { CreateUserJoinRequest } from "../user/user-join/create-user-join-request";

export class OrderRequest{
    id?: number;
    dateBook?: Date;
    totalPrice?: number;
    idUser?: number;
    createUserInfoRequest: CreateUserInfoRequest[];
    createUserJoinRequest: CreateUserJoinRequest[];
    paymentMethod?: number;
}